// Google's sample AdMob app ids keep development builds working until real ids are set in the EAS environment.
const TEST_ADMOB_ANDROID_APP_ID = "ca-app-pub-3940256099942544~3347511713";
const TEST_ADMOB_IOS_APP_ID = "ca-app-pub-3940256099942544~1458002511";

// AdMob crashes at launch on a malformed app id, so placeholders from .env.example fall back to the test ids.
const admobAppId = (value, fallback) => (/^ca-app-pub-\d+~\d+$/.test(value ?? "") ? value : fallback);

module.exports = ({ config }) => ({
  ...config,
  plugins: [
    ...(config.plugins ?? []),
    [
      "react-native-google-mobile-ads",
      {
        androidAppId: admobAppId(process.env.ADMOB_ANDROID_APP_ID, TEST_ADMOB_ANDROID_APP_ID),
        iosAppId: admobAppId(process.env.ADMOB_IOS_APP_ID, TEST_ADMOB_IOS_APP_ID),
        delayAppMeasurementInit: true
      }
    ]
  ]
});
