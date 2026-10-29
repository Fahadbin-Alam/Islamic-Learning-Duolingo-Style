import React, { createContext, useContext, useRef } from "react";
import type { StyleProp, ViewStyle } from "react-native";
import type { SecretSpot } from "../../data/secretLessons";
import { Tappable } from "../Tappable";

/** What a secret's hiding place calls on its third quick tap. TopicApp provides it; without it a spot is a plain picture. */
export const SecretContext = createContext<((spot: SecretSpot) => void) | undefined>(undefined);

export const SECRET_TAPS = 3;
/** The taps must come this close together, so ordinary taps never find a secret by accident. */
const TAP_WINDOW_MS = 1500;

/** A picture that hides a secret lesson: three quick taps find it. Single taps do nothing but a little squish. */
export function SecretTap({ spot, children, style, testID }: { spot: SecretSpot; children: React.ReactNode; style?: StyleProp<ViewStyle>; testID?: string }) {
  const find = useContext(SecretContext);
  const taps = useRef<number[]>([]);
  if (!find) return <>{children}</>;

  const press = () => {
    const now = Date.now();
    taps.current = [...taps.current.filter((at) => now - at < TAP_WINDOW_MS), now];
    if (taps.current.length >= SECRET_TAPS) {
      taps.current = [];
      find(spot);
    }
  };

  return (
    <Tappable onPress={press} sound="boing" pressScale={0.9} style={style} hiddenFromAccessibility testID={testID ?? `secret-${spot}`}>
      {children}
    </Tappable>
  );
}
