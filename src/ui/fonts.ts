import { useEffect, useState } from "react";
import { useFonts } from "expo-font";
import { Nunito_600SemiBold } from "@expo-google-fonts/nunito/600SemiBold";
import { Nunito_700Bold } from "@expo-google-fonts/nunito/700Bold";
import { Nunito_800ExtraBold } from "@expo-google-fonts/nunito/800ExtraBold";
import { BalooBhaijaan2_600SemiBold } from "@expo-google-fonts/baloo-bhaijaan-2/600SemiBold";
import { BalooBhaijaan2_700Bold } from "@expo-google-fonts/baloo-bhaijaan-2/700Bold";
import { BalooBhaijaan2_800ExtraBold } from "@expo-google-fonts/baloo-bhaijaan-2/800ExtraBold";
// Naskh face for Quran and hadith text: it has the Quranic pause marks and the ﷺ sign that Baloo lacks.
import { NotoNaskhArabic_600SemiBold } from "@expo-google-fonts/noto-naskh-arabic/600SemiBold";

const FONT_TIMEOUT_MS = 4000;

const APP_FONTS = {
  Nunito_600SemiBold,
  Nunito_700Bold,
  Nunito_800ExtraBold,
  BalooBhaijaan2_600SemiBold,
  BalooBhaijaan2_700Bold,
  BalooBhaijaan2_800ExtraBold,
  NotoNaskhArabic_600SemiBold
};

/**
 * Loads the app's font faces. Returns true once they are ready, or when loading
 * failed or took longer than 4 s (the app then falls back to system fonts).
 */
export function useAppFonts(): boolean {
  const [loaded, error] = useFonts(APP_FONTS);
  const [timedOut, setTimedOut] = useState(false);

  useEffect(() => {
    if (loaded || error) {
      return undefined;
    }
    const timer = setTimeout(() => setTimedOut(true), FONT_TIMEOUT_MS);
    return () => clearTimeout(timer);
  }, [loaded, error]);

  return loaded || Boolean(error) || timedOut;
}
