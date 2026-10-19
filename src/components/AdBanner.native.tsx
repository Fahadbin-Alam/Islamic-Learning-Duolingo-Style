import { useState } from "react";
import { View } from "react-native";

import { activeAdUnitIds, adRequestOptions, loadAdsModule } from "../services/monetization.native";

export function AdBanner({ hidden }: { hidden: boolean }) {
  const [failed, setFailed] = useState(false);
  const ads = loadAdsModule();
  const unitId = activeAdUnitIds()?.banner;

  if (hidden || failed || !ads || !unitId) {
    return null;
  }

  const { BannerAd, BannerAdSize } = ads;

  // In normal flow, so it takes its own row above the tabs and the screen above shrinks to fit.
  // (Drawn absolute at the bottom it sat on top of the tab bar.)
  return (
    <View style={{ alignSelf: "stretch", alignItems: "center" }} testID="ad-banner">
      <BannerAd unitId={unitId} size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER} requestOptions={adRequestOptions} onAdFailedToLoad={() => setFailed(true)} />
    </View>
  );
}
