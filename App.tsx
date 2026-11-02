import React, { useEffect, useState } from "react";
import { Platform } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import TopicApp from "./src/TopicApp";
import { hydrateAppStorage } from "./src/services/appStorage";
import { installWebAlert } from "./src/services/webAlert";
import { PhoneFrame, useAppFonts } from "./src/ui";
import { CrashScreen } from "./src/ui/CrashScreen";
import Gallery from "./src/ui/gallery/Gallery";

installWebAlert();

// Dev gallery: on web, open the app at #gallery (or #gallery-learn, #gallery-lesson, #gallery-more).
const SHOW_GALLERY =
  Platform.OS === "web" && typeof window !== "undefined" && window.location.hash.startsWith("#gallery");

export default function App() {
  const [storageReady, setStorageReady] = useState(false);
  const fontsReady = useAppFonts();

  useEffect(() => {
    void hydrateAppStorage().then(() => setStorageReady(true));
  }, []);

  if (!fontsReady) {
    return null;
  }

  if (SHOW_GALLERY) {
    return (
      <PhoneFrame>
        <Gallery />
      </PhoneFrame>
    );
  }

  // Saved progress is read synchronously on first render, so wait for it to load from the device.
  return storageReady ? (
    <SafeAreaProvider>
      <PhoneFrame>
        <CrashScreen>
          <TopicApp />
        </CrashScreen>
      </PhoneFrame>
    </SafeAreaProvider>
  ) : null;
}
