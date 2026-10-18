import { Alert, Platform } from "react-native";

type AlertButton = { text?: string; style?: string; onPress?: () => void };

// react-native-web ships Alert.alert as a no-op, so every "check your email" or "not enough gems"
// message disappeared silently in the browser. Show them with the browser's own dialogs instead.
export function showWebAlert(
  title: string,
  message?: string,
  buttons?: AlertButton[],
  win: Pick<Window, "alert" | "confirm"> | undefined = typeof window !== "undefined" ? window : undefined
) {
  if (!win) {
    return;
  }

  const text = message ? `${title}\n\n${message}` : title;
  const actions = buttons ?? [];
  const cancel = actions.find((button) => button.style === "cancel");
  const confirm = actions.find((button) => button !== cancel);

  if (cancel && confirm) {
    (win.confirm(text) ? confirm : cancel).onPress?.();
    return;
  }

  win.alert(text);
  actions[0]?.onPress?.();
}

export function installWebAlert() {
  if (Platform.OS === "web") {
    Alert.alert = (title, message, buttons) => showWebAlert(title, message, buttons as AlertButton[] | undefined);
  }
}
