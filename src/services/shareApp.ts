import { Platform, Share } from "react-native";
import { t } from "../i18n";

/** Dates each side gets for an invite. Same as INVITE_REWARD_DATES in backend/app/api/routes/invites.py. */
export const INVITE_REWARD_DATES = 50;

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

/** With a code (signed-in learners), the friend is told to type it so both get dates. */
export function inviteMessage(os?: string, iosLive?: boolean, code?: string, rewardDates = INVITE_REWARD_DATES) {
  const link = `\n${inviteLinks(os, iosLive)}`;
  if (code) {
    return t("Learn Islam with me on Muslimo! Quick, fun lessons on the Quran, Prophets and Sahabah. Sign up, type my invite code {code} and we both get {count} dates! {link}", {
      code,
      count: rewardDates,
      link
    });
  }
  return t("Learn Islam with me on Muslimo! Quick, fun lessons on the Quran, Prophets and Sahabah. {link}", { link });
}

/**
 * Opens the phone's own share menu (WhatsApp, Messages, email...) with the invite. The person picks
 * friends there, so Muslimo never reads the contacts list and needs no contacts permission.
 */
export function shareApp(code?: string, rewardDates?: number) {
  return Share.share({ message: inviteMessage(undefined, undefined, code, rewardDates), title: "Muslimo" }).catch(() => undefined);
}

/** "I finished day 5 of Ramadan on Muslimo!", with the Ramadan streak when there is one, and the store links. */
export function ramadanShareMessage(day: number, streak: number, os?: string, iosLive?: boolean) {
  const done = t("🌙 I finished day {day} of Ramadan on Muslimo!", { day: String(day) });
  const run = streak > 1 ? ` ${t("{count} days in a row.", { count: String(streak) })}` : "";
  return `${done}${run} ${t("Learn with me, one short lesson a day:")}\n${inviteLinks(os, iosLive)}`;
}

/** The phone's share menu with the Ramadan day card's message. */
export function shareRamadanDay(day: number, streak: number) {
  return Share.share({ message: ramadanShareMessage(day, streak), title: "Muslimo" }).catch(() => undefined);
}
