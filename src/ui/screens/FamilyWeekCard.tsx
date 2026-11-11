import React, { useEffect, useRef, useState } from "react";
import { Animated, Easing, StyleSheet, Text, View, useWindowDimensions } from "react-native";
import Svg, { Circle, Defs, Path, RadialGradient, Stop } from "react-native-svg";
import { COURSE } from "../../data/course";
import { t } from "../../i18n";
import { familyWeekDaysLeft, markFamilyWeekLit, useLitFamilyWeeks, type FamilyWeek, type FamilyWeekPerson } from "../../services/familyWeek";
import { Confetti } from "../Confetti";
import { Icon } from "../Icon";
import { useLiteMotion } from "../liteMotion";
import { useReduceMotion } from "../motion";
import { PopIn } from "../PopIn";
import { ProgressBar } from "../ProgressBar";
import { feedback } from "../sound";
import { colors, fonts, lighten, radii, space } from "../theme";
import { formatNumber } from "./FormattedCount";

/** Beyond this many lanterns (a big family) the rows become a bar. */
const MAX_LANTERNS = 21;
const LANTERN_GAP = 6;
/** The Me tab's side padding and the card's own border and padding: the card's inside width is the screen's less this. */
const CARD_INSET = 64;
const NIGHT = "#24305E";
const NIGHT_LIP = "#18204A";
const NIGHT_SOFT = "#C9D3F5";
const UNLIT = "#4A5688";
const GLOW = "#FFD45C";
const DONE_TEXT = "#5A3B00";
const AVATAR_COLORS = COURSE.sections.map((section) => section.accentColor);

function firstName(name: string) {
  return name.trim().split(/\s+/)[0] || name;
}

let glowCards = 0;

/** The lanterns in even rows (9 hang as 5 and 4, 12 as 6 and 6), as many to a row as fit, each row on a string. */
export function lanternRows(goal: number, size: number, width: number) {
  const fit = Math.max(1, Math.floor((width + LANTERN_GAP) / (size + LANTERN_GAP)));
  const perRow = Math.ceil(goal / Math.ceil(goal / fit));
  return Array.from({ length: Math.ceil(goal / perRow) }, (_, row) =>
    Array.from({ length: Math.max(0, Math.min(perRow, goal - row * perRow)) }, (_, column) => row * perRow + column)
  ).filter((line) => line.length > 0);
}

/**
 * The family challenge week on the Me tab: lanterns on a string, one lit for each day someone in the family learned,
 * to light together by Sunday. The people this phone may name stand under it, with a tick for those who learned
 * today. All lit: a cheer, once, and the week joins "weeks lit together". Nothing is lost if they are not.
 */
export function FamilyWeekCard({ week, testID = "family-week" }: { week: FamilyWeek; testID?: string }) {
  const reduceMotion = useReduceMotion();
  const lite = useLiteMotion();
  const litWeeks = useLitFamilyWeeks();
  const full = week.lit >= week.goal;
  const shown = Math.min(week.lit, week.goal);
  const daysLeft = familyWeekDaysLeft(week.today);
  const [party, setParty] = useState(false);
  const [glowId] = useState(() => `family-glow-${(glowCards += 1)}`);
  const [areaWidth, setAreaWidth] = useState(0);
  const { width: screenWidth } = useWindowDimensions();

  // The first time this phone sees every lantern lit this week: confetti, the unlock sound and a happy buzz.
  useEffect(() => {
    if (!full || !markFamilyWeekLit(week.weekStart)) return;
    setParty(true);
    feedback("unlock", "success");
  }, [full, week.weekStart]);

  // One slow sway shared by every lit lantern, as if hanging in a breeze.
  const sway = useRef(new Animated.Value(0)).current;
  const swaying = !reduceMotion && !lite && shown > 0;
  useEffect(() => {
    if (!swaying) {
      sway.setValue(0);
      return undefined;
    }
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(sway, { toValue: 1, duration: 1600, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
        Animated.timing(sway, { toValue: -1, duration: 3200, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
        Animated.timing(sway, { toValue: 0, duration: 1600, easing: Easing.inOut(Easing.sin), useNativeDriver: true })
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [swaying, sway]);

  const size = week.goal <= 14 ? 34 : 30;
  // Until the card is measured, the screen's width less the padding: right on a phone, so the rows don't jump.
  const rows = lanternRows(week.goal, size, areaWidth || Math.max(200, screenWidth - CARD_INSET));
  const status = full ? t("Your family lit every lantern! MashaAllah!") : week.lit === 0 ? t("A new week! Light the lanterns together.") : t("Every day someone in your family learns, a lantern lights up.");

  return (
    <View style={[styles.card, full ? styles.cardFull : null]} testID={testID}>
      <View style={styles.head}>
        <Icon name="lantern" size={26} />
        <Text style={styles.title} accessibilityRole="header" numberOfLines={1}>
          {t("Family challenge")}
        </Text>
        <View style={[styles.pill, full ? styles.pillFull : null]}>
          {full ? <Icon name="check" size={12} color={DONE_TEXT} /> : null}
          <Text style={[styles.pillText, full ? styles.pillTextFull : null]} testID={`${testID}-left`}>
            {full ? t("Done!") : daysLeft <= 1 ? t("Last day!") : t("{count} days left", { count: formatNumber(daysLeft) })}
          </Text>
        </View>
      </View>

      {week.goal <= MAX_LANTERNS ? (
        <View
          style={styles.lanterns}
          onLayout={(event) => {
            const width = event.nativeEvent.layout.width;
            setAreaWidth((old) => (Math.abs(old - width) < 1 ? old : width));
          }}
          accessible
          accessibilityLabel={t("{count} of {total} lanterns lit", { count: formatNumber(shown), total: formatNumber(week.goal) })}
          testID={`${testID}-lanterns`}
        >
          {rows.map((line, row) => (
            <View key={row} style={styles.lanternRow}>
              <LanternString count={line.length} size={size} />
              {line.map((index) => (
                <Lantern
                  key={index}
                  lit={index < shown}
                  size={size}
                  sway={sway}
                  swaying={swaying}
                  index={index}
                  glowId={`${glowId}-${index}`}
                  testID={index < shown ? `${testID}-lit` : `${testID}-unlit`}
                />
              ))}
            </View>
          ))}
        </View>
      ) : (
        <View style={styles.bar}>
          <ProgressBar progress={shown / week.goal} color={colors.gold} trackColor={UNLIT} />
        </View>
      )}

      <Text style={styles.count} testID={`${testID}-count`}>
        {t("{count} of {total} lanterns lit", { count: formatNumber(shown), total: formatNumber(week.goal) })}
      </Text>
      <Text style={[styles.status, full ? styles.statusFull : null]} testID={`${testID}-status`}>
        {status}
      </Text>

      <View style={styles.people}>
        {week.people.map((person, index) => (
          <Person key={person.key} person={person} color={person.self ? colors.gem : (AVATAR_COLORS[index % AVATAR_COLORS.length] ?? colors.green)} testID={`${testID}-person`} />
        ))}
        {week.others > 0 ? (
          <View style={styles.more} testID={`${testID}-others`}>
            <Text style={styles.moreText}>{t("+{count} more", { count: formatNumber(week.others) })}</Text>
          </View>
        ) : null}
      </View>

      {litWeeks.length > 0 ? (
        <View style={styles.weeks}>
          <Icon name="crown" size={16} />
          <Text style={styles.weeksText} testID={`${testID}-weeks`}>
            {t("Weeks lit together: {count}", { count: formatNumber(litWeeks.length) })}
          </Text>
        </View>
      ) : null}
      {party && !reduceMotion ? <Confetti active count={28} /> : null}
    </View>
  );
}

/** The string a row of lanterns hangs from, dipping a little between each two. */
function LanternString({ count, size }: { count: number; size: number }) {
  if (count < 2) return null;
  // Through the ring at the top of the lantern drawing.
  const hook = (size * 2.8) / 24;
  const sag = 4;
  const centers = Array.from({ length: count }, (_, index) => index * (size + LANTERN_GAP) + size / 2);
  const path = centers.slice(1).reduce((line, x, index) => `${line} Q${(centers[index] + x) / 2} ${hook + sag * 2} ${x} ${hook}`, `M${centers[0]} ${hook}`);
  return (
    <Svg width={count * size + (count - 1) * LANTERN_GAP} height={hook + sag * 2 + 2} style={styles.string}>
      <Path d={path} stroke={NIGHT_SOFT} strokeOpacity={0.45} strokeWidth={1.4} strokeLinecap="round" fill="none" />
    </Svg>
  );
}

/** Soft light around a lit lantern, fading out to the night. */
function Glow({ id, size }: { id: string; size: number }) {
  const box = Math.round(size * 1.3);
  return (
    <Svg width={box} height={box} style={{ position: "absolute", left: (size - box) / 2, top: size * 0.55 - box / 2 }}>
      <Defs>
        <RadialGradient id={id} cx="50%" cy="50%" r="50%">
          <Stop offset="0" stopColor={GLOW} stopOpacity={0.7} />
          <Stop offset="0.45" stopColor={GLOW} stopOpacity={0.26} />
          <Stop offset="1" stopColor={GLOW} stopOpacity={0} />
        </RadialGradient>
      </Defs>
      <Circle cx={box / 2} cy={box / 2} r={box / 2} fill={`url(#${id})`} />
    </Svg>
  );
}

/** One lantern: lit, it glows gold and sways with the others; out, a dim outline waiting for a day of learning. */
function Lantern({ lit, size, sway, swaying, index, glowId, testID }: { lit: boolean; size: number; sway: Animated.Value; swaying: boolean; index: number; glowId: string; testID: string }) {
  // Every other lantern swings the other way, each from the ring it hangs by.
  const turn = sway.interpolate({ inputRange: [-1, 1], outputRange: index % 2 ? ["5deg", "-5deg"] : ["-5deg", "5deg"] });
  const lantern = (
    <View style={{ width: size, height: size + 6, alignItems: "center", justifyContent: "flex-start" }}>
      {lit ? <Glow id={glowId} size={size} /> : null}
      <Icon name="lantern" size={size} color={lit ? undefined : UNLIT} />
    </View>
  );
  if (!lit) {
    return <View testID={testID}>{lantern}</View>;
  }
  return (
    <PopIn delay={Math.min(index, 20) * 45} from="scale">
      <Animated.View testID={testID} style={swaying ? { transform: [{ translateY: -size / 2 }, { rotate: turn }, { translateY: size / 2 }] } : null}>
        {lantern}
      </Animated.View>
    </PopIn>
  );
}

function Person({ person, color, testID }: { person: FamilyWeekPerson; color: string; testID: string }) {
  const name = person.self ? t("You") : firstName(person.name);
  return (
    <View style={styles.person} accessible accessibilityLabel={person.learnedToday ? t("{name}, learned today", { name }) : name} testID={person.learnedToday ? `${testID}-today` : testID}>
      <View style={[styles.avatar, { backgroundColor: color }]}>
        <Text style={styles.avatarText} numberOfLines={1}>
          {(person.initials || "?").slice(0, 2)}
        </Text>
        {person.learnedToday ? (
          <View style={styles.tick}>
            <Icon name="check" size={11} color={colors.white} />
          </View>
        ) : null}
      </View>
      {name ? (
        <Text style={styles.personName} numberOfLines={1}>
          {name}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginTop: 16,
    paddingVertical: 14,
    paddingHorizontal: 14,
    borderRadius: radii.lg,
    backgroundColor: NIGHT,
    borderWidth: 2,
    borderBottomWidth: 5,
    borderColor: NIGHT,
    borderBottomColor: NIGHT_LIP,
    overflow: "hidden"
  },
  cardFull: {
    borderColor: colors.gold,
    borderBottomColor: colors.goldLip
  },
  head: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8
  },
  title: {
    flex: 1,
    minWidth: 0,
    fontFamily: fonts.displayHeavy,
    fontSize: 19,
    color: colors.white
  },
  pill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: radii.pill,
    backgroundColor: "rgba(255,255,255,0.14)"
  },
  pillFull: {
    backgroundColor: colors.gold
  },
  pillText: {
    fontFamily: fonts.bodyHeavy,
    fontSize: 13,
    color: NIGHT_SOFT
  },
  pillTextFull: {
    color: DONE_TEXT
  },
  lanterns: {
    alignItems: "center",
    gap: 4,
    marginTop: space.md
  },
  lanternRow: {
    flexDirection: "row",
    columnGap: LANTERN_GAP
  },
  string: {
    position: "absolute",
    top: 0,
    left: 0
  },
  bar: {
    marginTop: space.md
  },
  count: {
    marginTop: space.sm,
    fontFamily: fonts.displayHeavy,
    fontSize: 17,
    color: colors.white,
    textAlign: "center"
  },
  status: {
    marginTop: 2,
    fontFamily: fonts.bodyBold,
    fontSize: 14,
    lineHeight: 20,
    color: NIGHT_SOFT,
    textAlign: "center"
  },
  statusFull: {
    color: colors.gold
  },
  people: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "flex-start",
    gap: 10,
    marginTop: space.md
  },
  person: {
    alignItems: "center",
    width: 54
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.35)"
  },
  avatarText: {
    fontFamily: fonts.bodyHeavy,
    fontSize: 13,
    color: colors.white
  },
  tick: {
    position: "absolute",
    end: -4,
    bottom: -4,
    width: 18,
    height: 18,
    borderRadius: 9,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.green,
    borderWidth: 2,
    borderColor: NIGHT
  },
  personName: {
    marginTop: 3,
    fontFamily: fonts.bodyBold,
    fontSize: 11,
    color: NIGHT_SOFT,
    maxWidth: 54
  },
  more: {
    height: 36,
    paddingHorizontal: 10,
    borderRadius: 18,
    justifyContent: "center",
    backgroundColor: lighten(NIGHT, 0.12)
  },
  moreText: {
    fontFamily: fonts.bodyHeavy,
    fontSize: 12,
    color: NIGHT_SOFT
  },
  weeks: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    marginTop: space.md
  },
  weeksText: {
    fontFamily: fonts.bodyHeavy,
    fontSize: 13,
    color: colors.gold
  }
});
