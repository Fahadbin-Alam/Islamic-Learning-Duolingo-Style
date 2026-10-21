import React, { useEffect, useRef } from "react";
import { Animated, Platform, StyleSheet, Text, View } from "react-native";
import { Icon, type IconName } from "../Icon";
import { Tappable } from "../Tappable";
import { t } from "../../i18n";
import { colors, fonts, lighten } from "../theme";

export type TabKey = "learn" | "practice" | "crew" | "shop" | "me";

/** Which tab an app screen belongs to. Every learning screen sits under Learn. */
export function tabForScreen(screen: string): TabKey {
  switch (screen) {
    case "review":
      return "practice";
    case "social":
      return "crew";
    case "shop":
      return "shop";
    case "profile":
      return "me";
    default:
      return "learn";
  }
}

export type BottomTabsProps = {
  active: TabKey;
  onChange: (tab: TabKey) => void;
  dots?: Partial<Record<TabKey, boolean>>;
  /** Bottom safe-area padding. Default: 20 on iOS, 6 elsewhere. */
  bottomInset?: number;
};

const TABS: Array<{ key: TabKey; icon: IconName; label: string }> = [
  { key: "learn", icon: "learn", label: "Learn" },
  { key: "practice", icon: "practice", label: "Practice" },
  { key: "crew", icon: "crew", label: "Crew" },
  { key: "shop", icon: "shop", label: "Shop" },
  { key: "me", icon: "profile", label: "Me" }
];

const DEFAULT_INSET = Platform.OS === "ios" ? 20 : 6;
const ACTIVE_BG = lighten(colors.gem, 0.9);
const ACTIVE_BORDER = lighten(colors.gem, 0.55);

function Tab({ tab, active, dot, onPress }: { tab: (typeof TABS)[number]; active: boolean; dot: boolean; onPress: () => void }) {
  const pop = useRef(new Animated.Value(1)).current;
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    if (active) {
      pop.setValue(0.8);
      Animated.spring(pop, { toValue: 1, friction: 4, tension: 220, useNativeDriver: true }).start();
    }
  }, [active, pop]);

  return (
    <Tappable
      onPress={onPress}
      pressScale={0.9}
      style={styles.tab}
      accessibilityRole="tab"
      accessibilityLabel={t(tab.label)}
      accessibilityState={{ selected: active }}
      testID={`tab-${tab.key}`}
    >
      <Animated.View style={[styles.iconBox, active ? styles.iconBoxActive : null, { transform: [{ scale: pop }] }]}>
        <View style={active ? null : styles.iconIdle}>
          <Icon name={tab.icon} size={28} />
        </View>
        {dot ? <View style={styles.dot} testID={`tab-${tab.key}-dot`} /> : null}
      </Animated.View>
      <Text style={[styles.label, active ? styles.labelActive : null]} numberOfLines={1}>
        {t(tab.label)}
      </Text>
    </Tappable>
  );
}

/** Five equal game tabs: icon plus a tiny label. */
export function BottomTabs({ active, onChange, dots, bottomInset = DEFAULT_INSET }: BottomTabsProps) {
  return (
    <View style={[styles.bar, { paddingBottom: bottomInset }]} accessibilityRole="tablist" testID="bottom-tabs">
      {TABS.map((tab) => (
        <Tab key={tab.key} tab={tab} active={tab.key === active} dot={Boolean(dots?.[tab.key])} onPress={() => onChange(tab.key)} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: "row",
    backgroundColor: colors.white,
    borderTopWidth: 2,
    borderTopColor: colors.line,
    paddingTop: 6,
    paddingHorizontal: 4
  },
  tab: {
    flex: 1,
    minWidth: 0,
    alignItems: "center",
    paddingVertical: 2,
    borderRadius: 14
  },
  iconBox: {
    width: 52,
    height: 40,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "transparent",
    alignItems: "center",
    justifyContent: "center"
  },
  iconBoxActive: {
    backgroundColor: ACTIVE_BG,
    borderColor: ACTIVE_BORDER
  },
  dot: {
    position: "absolute",
    top: 2,
    right: 6,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.heart,
    borderWidth: 2,
    borderColor: colors.white
  },
  iconIdle: {
    opacity: 0.85
  },
  label: {
    marginTop: 4,
    fontFamily: fonts.bodyHeavy,
    fontSize: 12,
    lineHeight: 15,
    color: colors.inkSoft,
    maxWidth: "100%"
  },
  labelActive: {
    color: colors.gemLip
  }
});
