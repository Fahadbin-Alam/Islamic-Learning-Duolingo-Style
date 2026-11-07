import { Platform, Share, type View } from "react-native";
import * as Sharing from "expo-sharing";
import { captureRef } from "react-native-view-shot";
import { t } from "../i18n";
import { certificateShareMessage, ramadanShareMessage, shareCertificate, shareRamadanDay } from "./shareApp";

// A card shared as a picture (the Ramadan "day done" card, a certificate): the card on screen is saved as a PNG in
// the app's own temporary folder (no photo-library permission) and handed to the phone's share menu. iPhone sends
// the picture with the invite text and store link; Android's share menu takes the picture alone, so the card
// itself says where to get Muslimo. If the picture can't be made, the text invite goes instead.

/** Shares the card as a picture; false when it couldn't, so the caller sends the text instead. */
async function sharePicture(card: View | null, message: string, dialogTitle: string) {
  if (!card) return false;
  try {
    const uri = await captureRef(card, { format: "png", quality: 1, result: "tmpfile" });
    if (Platform.OS === "ios") {
      await Share.share({ url: uri, message });
      return true;
    }
    if (await Sharing.isAvailableAsync()) {
      await Sharing.shareAsync(uri, { mimeType: "image/png", dialogTitle });
      return true;
    }
  } catch {
    // Fall through to the text invite.
  }
  return false;
}

export async function shareRamadanCard(card: View | null, day: number, streak: number) {
  if (await sharePicture(card, ramadanShareMessage(day, streak), t("Share day {day}", { day: String(day) }))) return;
  await shareRamadanDay(day, streak);
}

export async function shareCertificateCard(card: View | null, title: string) {
  if (await sharePicture(card, certificateShareMessage(title), t("Share your certificate"))) return;
  await shareCertificate(title);
}
