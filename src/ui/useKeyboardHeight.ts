import { useEffect, useState } from "react";
import { Dimensions, Keyboard, Platform, type KeyboardEvent } from "react-native";

/**
 * How far the on-screen keyboard reaches up over the window, in points (0 when it is closed).
 * Android apps are edge to edge and iOS never shrinks the window, so a screen pinned to the bottom
 * ends up under the keyboard unless it makes room itself. Measuring from the window bottom also
 * stays right on a phone that does shrink the window (the overlap is then about 0).
 */
export function useKeyboardHeight() {
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (Platform.OS === "web") {
      return undefined;
    }
    const show = (event: KeyboardEvent) => {
      const { height: keyboardHeight, screenY } = event.endCoordinates;
      const overlap = screenY > 0 ? Dimensions.get("window").height - screenY : keyboardHeight;
      setHeight(Math.max(0, Math.round(overlap)));
    };
    const hide = () => setHeight(0);
    // iOS animates with the keyboard ("will"); Android only sends "did".
    const subscriptions = Platform.OS === "ios"
      ? [Keyboard.addListener("keyboardWillChangeFrame", show), Keyboard.addListener("keyboardWillHide", hide)]
      : [Keyboard.addListener("keyboardDidShow", show), Keyboard.addListener("keyboardDidHide", hide)];
    return () => subscriptions.forEach((subscription) => subscription.remove());
  }, []);

  return height;
}
