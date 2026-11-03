import { Platform, Share, type View } from "react-native";
import * as Sharing from "expo-sharing";
import { captureRef } from "react-native-view-shot";
import { t } from "../i18n";
import { ramadanShareMessage, shareRamadanDay } from "./shareApp";

// The Ramadan "day done" card shared as a picture: the card on screen is saved as a PNG in the app's own
// temporary folder (no photo-library permission) and handed to the phone's share menu. iPhone sends the
// picture with the invite text and store link; Android's share menu takes the picture alone, so the card
// itself says where to get Muslimo. If the picture can't be made, the text invite goes instead.

export async function shareRamadanCard(card: View | null, day: number, streak: number) {
  if (card) {
    try {
      const uri = await captureRef(card, { format: "png", quality: 1, result: "tmpfile" });
      if (Platform.OS === "ios") {
        await Share.share({ url: uri, message: ramadanShareMessage(day, streak) });
        return;
      }
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(uri, { mimeType: "image/png", dialogTitle: t("Share day {day}", { day: String(day) }) });
        return;
      }
    } catch {
      // Fall through to the text invite.
    }
  }
  await shareRamadanDay(day, streak);
}
