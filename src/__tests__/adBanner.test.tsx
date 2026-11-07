import { act, render, screen } from "@testing-library/react-native";

let mockResolveStarted: (ready: boolean) => void = () => undefined;
let mockFailLoad: (() => void) | undefined;
const mockBannerMounts = jest.fn();

jest.mock("../services/monetization.native", () => ({
  whenAdsStarted: () =>
    new Promise<boolean>((resolve) => {
      mockResolveStarted = resolve;
    }),
  activeAdUnitIds: () => ({ banner: "test-banner", rewarded: "r", interstitial: "i" }),
  adRequestOptions: () => ({ requestNonPersonalizedAdsOnly: true }),
  currentAdAudience: () => "child",
  loadAdsModule: () => ({
    BannerAdSize: { ANCHORED_ADAPTIVE_BANNER: "ADAPTIVE" },
    BannerAd: ({ onAdFailedToLoad }: { onAdFailedToLoad: () => void }) => {
      const { useEffect } = require("react");
      const { Text } = require("react-native");
      useEffect(() => {
        mockBannerMounts();
      }, []);
      mockFailLoad = onAdFailedToLoad;
      return <Text>banner ad</Text>;
    }
  })
}));

import { AdBanner, BANNER_RETRY_MS } from "../components/AdBanner.native";

describe("banner ad", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    mockBannerMounts.mockClear();
  });
  afterEach(() => jest.useRealTimers());

  it("waits until the ads have started (age screen, consent and child-safe settings) before asking for an ad", async () => {
    await render(<AdBanner hidden={false} />);
    expect(screen.queryByTestId("ad-banner")).toBeNull();

    await act(async () => mockResolveStarted(true));
    expect(screen.getByTestId("ad-banner")).toBeTruthy();
  });

  it("stays away when ads could not start or the learner has no ads", async () => {
    const off = await render(<AdBanner hidden={false} />);
    await act(async () => mockResolveStarted(false));
    expect(off.queryByTestId("ad-banner")).toBeNull();

    const paid = await render(<AdBanner hidden />);
    await act(async () => mockResolveStarted(true));
    expect(paid.queryByTestId("ad-banner")).toBeNull();
  });

  it("tries again a minute after an ad fails to load instead of staying empty", async () => {
    await render(<AdBanner hidden={false} />);
    await act(async () => mockResolveStarted(true));
    expect(mockBannerMounts).toHaveBeenCalledTimes(1);

    await act(async () => mockFailLoad?.());
    expect(screen.queryByTestId("ad-banner")).toBeNull();

    await act(async () => jest.advanceTimersByTime(BANNER_RETRY_MS));
    expect(screen.getByTestId("ad-banner")).toBeTruthy();
    expect(mockBannerMounts).toHaveBeenCalledTimes(2);
  });
});
