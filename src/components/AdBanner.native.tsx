import { useState } from "react";
import { View } from "react-native";

import { activeAdUnitIds, loadAdsModule } from "../services/monetization.native";

export function AdBanner({ hidden }: { hidden: boolean }) {
  const [failed, setFailed] = useState(false);
  const ads = loadAdsModule();
  const unitId = activeAdUnitIds()?.banner;

  if (hidden || failed || !ads || !unitId) {
    return null;
  }

  const { BannerAd, BannerAdSize } = ads;

  return (
    <View style={{ position: "absolute", left: 0, right: 0, bottom: 0, alignItems: "center" }}>
      <BannerAd unitId={unitId} size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER} onAdFailedToLoad={() => setFailed(true)} />
    </View>
  );
}
