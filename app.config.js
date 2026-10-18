// Google's sample AdMob app ids keep development builds working until real ids are set in the EAS environment.
const TEST_ADMOB_ANDROID_APP_ID = "ca-app-pub-3940256099942544~3347511713";
const TEST_ADMOB_IOS_APP_ID = "ca-app-pub-3940256099942544~1458002511";

// AdMob crashes at launch on a malformed app id, so placeholders from .env.example fall back to the test ids.
const admobAppId = (value, fallback) => (/^ca-app-pub-\d+~\d+$/.test(value ?? "") ? value : fallback);

// SKAdNetwork ids from Google's AdMob iOS setup guide (Google first), so ad networks can attribute installs without tracking.
const SK_AD_NETWORK_ITEMS = [
  "cstr6suwn9", "4fzdc2evr5", "2fnua5tdw4", "ydx93a7ass", "p78axxw29g", "v72qych5uu", "ludvb6z3bs", "cp8zw746q7",
  "3sh42y64q3", "c6k4g5qg8m", "s39g8k73mm", "3qy4746246", "hs6bdukanm", "mlmmfzh3r3", "v4nxqhlyqp", "wzmmz9fp6w",
  "su67r6k2v3", "yclnxrl5pm", "7ug5zh24hu", "gta9lk7p23", "vutu7akeur", "y5ghdn5j9k", "v9wttpbfk9", "n38lu8286q",
  "47vhws6wlr", "kbd757ywx3", "9t245vhmpl", "a2p9lx4jpn", "22mmun2rn5", "4468km3ulz", "2u9pt9hc89", "8s468mfl3y",
  "ppxm28t8ap", "uw77j35x4d", "pwa73g5rt2", "578prtvx9j", "4dzt52r2t5", "tl55sbb4fm", "e5fvkxwrpn", "8c4e2ghe7u",
  "3rd42ekr43", "3qcr597p9d"
].map((id) => `${id}.skadnetwork`);

module.exports = ({ config }) => ({
  ...config,
  plugins: [
    ...(config.plugins ?? []),
    [
      "react-native-google-mobile-ads",
      {
        androidAppId: admobAppId(process.env.ADMOB_ANDROID_APP_ID, TEST_ADMOB_ANDROID_APP_ID),
        iosAppId: admobAppId(process.env.ADMOB_IOS_APP_ID, TEST_ADMOB_IOS_APP_ID),
        delayAppMeasurementInit: true,
        skAdNetworkItems: SK_AD_NETWORK_ITEMS
      }
    ]
  ]
});
