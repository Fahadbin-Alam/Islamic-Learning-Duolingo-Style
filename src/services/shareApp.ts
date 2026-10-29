import { Platform, Share } from "react-native";
import { t } from "../i18n";

export const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=com.islamiclearning.muslimo";
export const APP_STORE_URL = "https://apps.apple.com/app/id6828072104";
/**
 * Set to true in the build after the iPhone app goes live on the App Store: until then the App Store
 * link is a dead page, so Android phones share the Play link only. An iPhone always shares its own store.
 */
export const IOS_APP_LIVE = false;

/** Store links for an invite: Play always, the App Store once it is live (or when sent from an iPhone). */
export function inviteLinks(os: string = Platform.OS, iosLive: boolean = IOS_APP_LIVE) {
  const ios = iosLive || os === "ios";
  return ios ? `Android: ${PLAY_STORE_URL}\niPhone: ${APP_STORE_URL}` : PLAY_STORE_URL;
}

export function inviteMessage(os?: string, iosLive?: boolean) {
  return t("Learn Islam with me on Muslimo! Quick, fun lessons on the Quran, Prophets and Sahabah. {link}", {
    link: `\n${inviteLinks(os, iosLive)}`
  });
}

/**
 * Opens the phone's own share menu (WhatsApp, Messages, email...) with the invite. The person picks
 * friends there, so Muslimo never reads the contacts list and needs no contacts permission.
 */
export function shareApp() {
  return Share.share({ message: inviteMessage(), title: "Muslimo" }).catch(() => undefined);
}
