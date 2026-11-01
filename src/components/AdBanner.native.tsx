import { useEffect, useState } from "react";
import { View } from "react-native";

import { activeAdUnitIds, adRequestOptions, currentAdAudience, loadAdsModule, whenAdsStarted } from "../services/monetization.native";

// A banner that finds no ad (common while a new AdMob account is still being reviewed) tries again
// a little later instead of staying empty for the rest of the session.
export const BANNER_RETRY_MS = 60_000;

export function AdBanner({ hidden }: { hidden: boolean }) {
  const [started, setStarted] = useState(false);
  const [failed, setFailed] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const ads = loadAdsModule();
  const unitId = activeAdUnitIds()?.banner;

  useEffect(() => {
    let live = true;
    void whenAdsStarted().then((ready) => {
      if (live) setStarted(ready);
    });
    return () => {
      live = false;
    };
  }, []);

  useEffect(() => {
    if (!failed) return;
    const timer = setTimeout(() => {
      setFailed(false);
      setAttempt((count) => count + 1);
    }, BANNER_RETRY_MS);
    return () => clearTimeout(timer);
  }, [failed]);

  if (hidden || failed || !started || !ads || !unitId) {
    return null;
  }

  const { BannerAd, BannerAdSize } = ads;

  // In normal flow, so it takes its own row above the tabs and the screen above shrinks to fit.
  // (Drawn absolute at the bottom it sat on top of the tab bar.)
  return (
    <View style={{ alignSelf: "stretch", alignItems: "center" }} testID="ad-banner">
      {/* Keyed by audience so an answer on the age screen asks for a fresh banner with the right settings,
          and by attempt so a retry after a failed load asks for a new ad. */}
      <BannerAd
        key={`${currentAdAudience()}-${attempt}`}
        unitId={unitId}
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
        requestOptions={adRequestOptions()}
        onAdFailedToLoad={() => setFailed(true)}
      />
    </View>
  );
}
