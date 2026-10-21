import React, { createContext, useContext, useLayoutEffect, useMemo, useRef, useState } from "react";
import { StyleSheet, View, type StyleProp, type ViewStyle } from "react-native";

type PortalStore = {
  set: (key: string, node: React.ReactNode) => void;
  remove: (key: string) => void;
};

type Entry = { key: string; node: React.ReactNode };

const PortalContext = createContext<PortalStore | null>(null);

let nextKey = 0;

/**
 * Wraps the app shell. Anything inside a `Portal` below it is drawn in a layer on top of
 * the whole shell (top bar and tabs included), so a sheet opened deep in a screen still
 * dims the whole phone. Drop-in for the shell's root View: it takes the same style.
 */
export function PortalHost({ children, style, testID }: { children?: React.ReactNode; style?: StyleProp<ViewStyle>; testID?: string }) {
  const [entries, setEntries] = useState<Entry[]>([]);
  // Stable, so portals never re-render when the layer changes.
  const store = useMemo<PortalStore>(
    () => ({
      set: (key, node) =>
        setEntries((list) => {
          const index = list.findIndex((entry) => entry.key === key);
          if (index === -1) return [...list, { key, node }];
          if (list[index].node === node) return list;
          const next = list.slice();
          next[index] = { key, node };
          return next;
        }),
      remove: (key) => setEntries((list) => (list.some((entry) => entry.key === key) ? list.filter((entry) => entry.key !== key) : list))
    }),
    []
  );

  return (
    <PortalContext.Provider value={store}>
      <View style={[styles.host, style]} testID={testID}>
        {children}
        {entries.length ? (
          <View style={StyleSheet.absoluteFill} pointerEvents="box-none" testID="portal-layer">
            {entries.map((entry) => (
              <React.Fragment key={entry.key}>{entry.node}</React.Fragment>
            ))}
          </View>
        ) : null}
      </View>
    </PortalContext.Provider>
  );
}

/** Draws its children in the nearest PortalHost's top layer, or right here when there is none (tests, gallery). */
export function Portal({ children }: { children?: React.ReactNode }) {
  const store = useContext(PortalContext);
  const key = useRef<string | undefined>(undefined);
  if (!key.current) {
    key.current = `portal-${(nextKey += 1)}`;
  }

  // Hand the latest children to the host after every render.
  useLayoutEffect(() => {
    store?.set(key.current as string, children);
  });
  useLayoutEffect(() => {
    const id = key.current as string;
    return () => store?.remove(id);
  }, [store]);

  return store ? null : <>{children}</>;
}

const styles = StyleSheet.create({
  host: {
    flex: 1
  }
});
