// Adds the Android home-screen widget (today's ayah and hadith) to the native project at prebuild:
// copies widgets/android into the app module and registers the widget's receiver in the manifest.
// The iPhone widget lives in targets/daily-widget and is added by @bacons/apple-targets.
const fs = require("fs");
const path = require("path");
const { AndroidConfig, withAndroidManifest, withDangerousMod } = require("expo/config-plugins");

const SOURCE = path.join(__dirname, "..", "widgets");
const RECEIVER = ".DailyAyahWidget";

function copyDir(from, to) {
  fs.mkdirSync(to, { recursive: true });
  for (const entry of fs.readdirSync(from, { withFileTypes: true })) {
    const source = path.join(from, entry.name);
    const target = path.join(to, entry.name);
    if (entry.isDirectory()) copyDir(source, target);
    else fs.copyFileSync(source, target);
  }
}

const withWidgetFiles = (config) =>
  withDangerousMod(config, [
    "android",
    (config) => {
      const pkg = config.android?.package;
      if (!pkg) throw new Error("withDailyAyahWidget needs android.package");
      const main = path.join(config.modRequest.platformProjectRoot, "app", "src", "main");
      const kotlinDir = path.join(main, "java", ...pkg.split("."));
      fs.mkdirSync(kotlinDir, { recursive: true });
      const kotlin = fs.readFileSync(path.join(SOURCE, "android", "DailyAyahWidget.kt"), "utf8").replace("__PACKAGE__", pkg);
      fs.writeFileSync(path.join(kotlinDir, "DailyAyahWidget.kt"), kotlin);
      copyDir(path.join(SOURCE, "android", "res"), path.join(main, "res"));
      fs.mkdirSync(path.join(main, "assets"), { recursive: true });
      fs.copyFileSync(path.join(SOURCE, "daily.json"), path.join(main, "assets", "daily_widget.json"));
      return config;
    }
  ]);

const withWidgetReceiver = (config) =>
  withAndroidManifest(config, (config) => {
    const app = AndroidConfig.Manifest.getMainApplicationOrThrow(config.modResults);
    app.receiver = (app.receiver ?? []).filter((receiver) => receiver.$["android:name"] !== RECEIVER);
    app.receiver.push({
      $: { "android:name": RECEIVER, "android:exported": "false", "android:label": "@string/daily_widget_label" },
      "intent-filter": [
        {
          action: [
            "android.appwidget.action.APPWIDGET_UPDATE",
            "android.intent.action.TIME_SET",
            "android.intent.action.TIMEZONE_CHANGED",
            "android.intent.action.LOCALE_CHANGED"
          ].map((name) => ({ $: { "android:name": name } }))
        }
      ],
      "meta-data": [{ $: { "android:name": "android.appwidget.provider", "android:resource": "@xml/daily_ayah_widget_info" } }]
    });
    return config;
  });

module.exports = (config) => withWidgetReceiver(withWidgetFiles(config));
