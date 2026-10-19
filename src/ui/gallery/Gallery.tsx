import React, { useEffect, useState } from "react";
import { Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import { ArabicText } from "../ArabicText";
import { ChoiceTile, type ChoiceTileState } from "../ChoiceTile";
import { Confetti } from "../Confetti";
import { CountUp } from "../CountUp";
import { GameButton, type GameButtonSize, type GameButtonVariant } from "../GameButton";
import { ICON_NAMES, Icon } from "../Icon";
import { Mascot, type MascotMood } from "../Mascot";
import { PopIn } from "../PopIn";
import { ProgressBar } from "../ProgressBar";
import { Sheet } from "../Sheet";
import { SpeechBubble } from "../SpeechBubble";
import { StatChip } from "../StatChip";
import { colors, fonts, text, topicPalette } from "../theme";
import LearnGallery from "./LearnGallery";
import LessonGallery from "./LessonGallery";
import MoreGallery from "./MoreGallery";

const MOODS: MascotMood[] = ["happy", "wave", "cheer", "think", "sad"];
const VARIANTS: GameButtonVariant[] = ["primary", "secondary", "gold", "blue", "danger", "ghost", "white"];
const SIZES: GameButtonSize[] = ["lg", "md", "sm"];
const TILE_STATES: ChoiceTileState[] = ["idle", "selected", "correct", "wrong", "disabled", "dimmed"];

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );
}

/** Every kit component in every variant and state. */
export function KitGallery() {
  const [sheet, setSheet] = useState<"white" | "correct" | "wrong" | null>(null);
  const [confetti, setConfetti] = useState(false);
  const [progress, setProgress] = useState(0.35);
  const [picked, setPicked] = useState<number | null>(null);
  const [gems, setGems] = useState(505);
  const [countKey, setCountKey] = useState(0);
  const manners = topicPalette("#D96C8E");

  return (
    <View style={styles.root}>
      <ScrollView contentContainerStyle={styles.scroll} testID="kit-gallery">
        <Text style={styles.title}>Sira Path kit</Text>

        <Section title="Stat chips">
          <View style={styles.statRow}>
            <StatChip icon="flame" value={12} color={colors.flame} accessibilityLabel="Streak 12 days" />
            <StatChip icon="gem" value={gems} color={colors.gem} accessibilityLabel={`${gems} gems`} onPress={() => setGems((v) => v + 10)} />
            <StatChip icon="heart" value={5} color={colors.heart} accessibilityLabel="5 hearts" />
            <StatChip icon="flame" value={0} color={colors.flame} dim accessibilityLabel="No streak" />
          </View>
        </Section>

        <Section title="Mascot">
          <View style={styles.wrapRow}>
            {MOODS.map((mood) => (
              <View key={`girl-${mood}`} style={styles.mascotCell}>
                <Mascot variant="girl" mood={mood} size={92} />
                <Text style={styles.caption}>{mood}</Text>
              </View>
            ))}
          </View>
          <View style={styles.wrapRow}>
            {MOODS.map((mood) => (
              <View key={`boy-${mood}`} style={styles.mascotCell}>
                <Mascot variant="boy" mood={mood} size={92} accent={colors.gem} />
                <Text style={styles.caption}>{mood}</Text>
              </View>
            ))}
          </View>
          <View style={styles.bubbleRow}>
            <Mascot variant="hijabi" mood="wave" size={110} accent={manners.main} />
            <View style={styles.bubbleWrap}>
              <SpeechBubble>Say salam to everyone you meet!</SpeechBubble>
            </View>
          </View>
          <SpeechBubble tail="down" style={styles.downBubble}>
            <ArabicText size={26} weight="bold">
              السَّلَامُ عَلَيْكُمْ
            </ArabicText>
          </SpeechBubble>
        </Section>

        <Section title="Buttons">
          {VARIANTS.map((variant) => (
            <View key={variant} style={[styles.buttonBlock, variant === "white" ? styles.onColor : null]}>
              <Text style={[styles.caption, variant === "white" ? styles.captionOnColor : null]}>{variant}</Text>
              <View style={styles.buttonRow}>
                {SIZES.map((size) => (
                  <GameButton key={size} label={size === "lg" ? "Continue" : "Start"} variant={variant} size={size} />
                ))}
              </View>
            </View>
          ))}
          <GameButton label="Check" fullWidth />
          <View style={styles.gap} />
          <GameButton label="Check" fullWidth disabled />
          <View style={styles.gap} />
          <GameButton label="Get gems" icon="gem" variant="secondary" fullWidth />
          <View style={styles.gap} />
          <GameButton label="Refill hearts" icon="heart" variant="danger" fullWidth />
          <View style={styles.gap} />
          <GameButton label="Topic color" color={manners.main} icon="handHeart" fullWidth />
          <View style={styles.gap} />
          <GameButton label="This is a very long button label that should wrap nicely" fullWidth variant="blue" />
        </Section>

        <Section title="Choice tiles">
          {TILE_STATES.map((state, index) => (
            <View key={state} style={styles.tileGap}>
              <ChoiceTile label={`${state[0].toUpperCase()}${state.slice(1)} answer`} state={state} badge={String(index + 1)} />
            </View>
          ))}
          <View style={styles.tileGap}>
            <ChoiceTile
              label="Before eating we say Bismillah, and after we finish we thank Allah by saying Alhamdulillah"
              state={picked === 0 ? "selected" : "idle"}
              onPress={() => setPicked(0)}
              icon="dua"
            />
          </View>
          <View style={styles.tileGap}>
            <ChoiceTile label="السَّلَامُ عَلَيْكُمْ" state={picked === 1 ? "selected" : "idle"} onPress={() => setPicked(1)} badge="2" />
          </View>
          <View style={styles.tileGap}>
            <ChoiceTile label="Tap me to shake" state={picked === 2 ? "wrong" : "idle"} onPress={() => setPicked(2)} />
          </View>
          <View style={styles.squareRow}>
            <ChoiceTile label="True" icon="check" layout="square" state={picked === 3 ? "selected" : "idle"} onPress={() => setPicked(3)} />
            <View style={styles.squareGap} />
            <ChoiceTile label="False" icon="close" layout="square" state={picked === 4 ? "selected" : "idle"} onPress={() => setPicked(4)} />
          </View>
        </Section>

        <Section title="Progress">
          <ProgressBar progress={progress} />
          <View style={styles.gap} />
          <ProgressBar progress={0.02} color={colors.gold} height={12} />
          <View style={styles.gap} />
          <ProgressBar progress={0.8} color={manners.main} height={20} />
          <View style={styles.gap} />
          <View style={styles.buttonRow}>
            <GameButton label="-" size="sm" variant="secondary" onPress={() => setProgress((v) => Math.max(0, v - 0.15))} />
            <GameButton label="+" size="sm" onPress={() => setProgress((v) => Math.min(1, v + 0.15))} />
          </View>
        </Section>

        <Section title="Count up">
          <View style={styles.countRow}>
            <View style={[styles.countCard, { borderColor: colors.gold }]}>
              <Icon name="bolt" size={28} />
              <CountUp key={`xp-${countKey}`} value={45} style={[styles.countValue, { color: colors.goldLip }]} />
            </View>
            <View style={[styles.countCard, { borderColor: colors.green }]}>
              <Icon name="star" size={28} />
              <CountUp key={`acc-${countKey}`} value={92} suffix="%" style={[styles.countValue, { color: colors.green }]} />
            </View>
            <View style={[styles.countCard, { borderColor: colors.gem }]}>
              <Icon name="gem" size={28} />
              <CountUp key={`gem-${countKey}`} value={20} prefix="+" style={[styles.countValue, { color: colors.gem }]} />
            </View>
          </View>
          <View style={styles.gap} />
          <GameButton label="Replay" size="sm" variant="secondary" style={styles.hug} onPress={() => setCountKey((v) => v + 1)} />
        </Section>

        <Section title="Sheets + confetti">
          <View style={styles.buttonRow}>
            <GameButton label="Sheet" size="md" variant="secondary" onPress={() => setSheet("white")} />
            <GameButton label="Correct" size="md" onPress={() => setSheet("correct")} sound="correct" />
            <GameButton label="Wrong" size="md" variant="danger" onPress={() => setSheet("wrong")} sound="wrong" />
          </View>
          <View style={styles.gap} />
          <GameButton
            label="Confetti"
            variant="gold"
            icon="sparkle"
            fullWidth
            sound="lesson_complete"
            onPress={() => {
              setConfetti(false);
              setTimeout(() => setConfetti(true), 0);
            }}
          />
        </Section>

        <Section title="Pop in">
          <View style={styles.wrapRow}>
            {(["scale", "up", "down"] as const).map((from, index) => (
              <PopIn key={`${from}-${countKey}`} from={from} delay={index * 120} style={styles.popCell}>
                <Icon name="star" size={36} />
                <Text style={styles.caption}>{from}</Text>
              </PopIn>
            ))}
          </View>
        </Section>

        <Section title="Arabic">
          <View style={styles.arabicRow}>
            <ArabicText size={34} weight="bold" color={colors.green}>
              بِسْمِ اللَّهِ
            </ArabicText>
            <Text style={styles.body}>Bismillah</Text>
          </View>
        </Section>

        <Section title={`Icons (${ICON_NAMES.length})`}>
          <View style={styles.iconGrid} testID="icon-grid">
            {ICON_NAMES.map((name) => (
              <View key={name} style={styles.iconCell}>
                <Icon name={name} size={32} />
                <Text style={styles.iconName} numberOfLines={1}>
                  {name}
                </Text>
              </View>
            ))}
          </View>
          <Text style={styles.caption}>silhouette (tab inactive / active)</Text>
          <View style={styles.wrapRow}>
            {(["learn", "practice", "crew", "shop", "profile"] as const).map((name) => (
              <View key={name} style={styles.tabCell}>
                <Icon name={name} size={30} color="#AFBDB6" />
                <Icon name={name} size={30} />
              </View>
            ))}
          </View>
        </Section>
      </ScrollView>

      <Confetti active={confetti} />

      <Sheet visible={sheet !== null} tone={sheet ?? "white"} onClose={() => setSheet(null)}>
        {sheet === "white" ? (
          <View>
            <Text style={styles.sheetTitle}>Out of hearts</Text>
            <View style={styles.gap} />
            <GameButton label="Refill" icon="heart" variant="danger" fullWidth onPress={() => setSheet(null)} />
            <View style={styles.gap} />
            <GameButton label="No thanks" variant="ghost" fullWidth onPress={() => setSheet(null)} />
          </View>
        ) : (
          <View>
            <View style={styles.feedbackRow}>
              <View style={[styles.feedbackBadge, { backgroundColor: colors.white }]}>
                <Icon name={sheet === "correct" ? "check" : "close"} size={26} color={sheet === "correct" ? colors.green : colors.heart} />
              </View>
              <Text style={[styles.sheetTitle, { color: sheet === "correct" ? colors.correctInk : colors.wrongInk }]}>
                {sheet === "correct" ? "MashaAllah!" : "Correct answer:"}
              </Text>
            </View>
            {sheet === "wrong" ? <Text style={[styles.body, { color: colors.wrongInk }]}>As-salamu alaykum</Text> : null}
            <View style={styles.gap} />
            <GameButton
              label={sheet === "correct" ? "Continue" : "Got it"}
              variant={sheet === "correct" ? "primary" : "danger"}
              fullWidth
              onPress={() => setSheet(null)}
            />
          </View>
        )}
      </Sheet>
    </View>
  );
}

function readHash() {
  if (Platform.OS !== "web" || typeof window === "undefined") {
    return "#gallery";
  }
  return window.location.hash || "#gallery";
}

/** Picks a gallery from the URL hash: #gallery, #gallery-learn, #gallery-lesson, #gallery-more. */
export default function Gallery() {
  const [hash, setHash] = useState(readHash);

  useEffect(() => {
    if (Platform.OS !== "web" || typeof window === "undefined") {
      return undefined;
    }
    const onChange = () => setHash(readHash());
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);

  if (hash.startsWith("#gallery-learn")) {
    return <LearnGallery />;
  }
  if (hash.startsWith("#gallery-lesson")) {
    return <LessonGallery />;
  }
  if (hash.startsWith("#gallery-more")) {
    return <MoreGallery />;
  }
  return <KitGallery />;
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.snow
  },
  scroll: {
    padding: 16,
    paddingBottom: 80
  },
  title: {
    ...text.h1,
    marginBottom: 8
  },
  section: {
    marginTop: 20
  },
  sectionTitle: {
    ...text.h3,
    color: colors.inkSoft,
    marginBottom: 10
  },
  statRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between"
  },
  wrapRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-end"
  },
  mascotCell: {
    alignItems: "center",
    width: "33%",
    marginBottom: 10
  },
  caption: {
    ...text.tiny,
    marginTop: 4,
    marginBottom: 4
  },
  captionOnColor: {
    color: colors.white
  },
  bubbleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8
  },
  bubbleWrap: {
    flex: 1,
    minWidth: 0,
    marginLeft: 8
  },
  downBubble: {
    alignSelf: "flex-start",
    marginTop: 16
  },
  buttonBlock: {
    marginBottom: 12,
    borderRadius: 16,
    padding: 8
  },
  onColor: {
    backgroundColor: colors.green
  },
  buttonRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-end",
    gap: 10
  },
  gap: {
    height: 12
  },
  hug: {
    alignSelf: "flex-start"
  },
  tileGap: {
    marginBottom: 10
  },
  squareRow: {
    flexDirection: "row"
  },
  squareGap: {
    width: 12
  },
  countRow: {
    flexDirection: "row",
    gap: 10
  },
  countCard: {
    flex: 1,
    minWidth: 0,
    borderWidth: 2,
    borderRadius: 16,
    alignItems: "center",
    paddingVertical: 12
  },
  countValue: {
    fontFamily: fonts.displayHeavy,
    fontSize: 24,
    lineHeight: 30
  },
  popCell: {
    alignItems: "center",
    width: 80
  },
  arabicRow: {
    alignItems: "center"
  },
  body: {
    ...text.body
  },
  iconGrid: {
    flexDirection: "row",
    flexWrap: "wrap"
  },
  iconCell: {
    width: "20%",
    alignItems: "center",
    paddingVertical: 8
  },
  iconName: {
    ...text.tiny,
    fontSize: 10,
    lineHeight: 14,
    marginTop: 2,
    maxWidth: "100%"
  },
  tabCell: {
    flexDirection: "row",
    gap: 6,
    marginRight: 14,
    marginBottom: 8
  },
  sheetTitle: {
    ...text.h2,
    flexShrink: 1
  },
  feedbackRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 6
  },
  feedbackBadge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center"
  }
});
