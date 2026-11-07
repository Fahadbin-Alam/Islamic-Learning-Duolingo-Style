// The iPhone home-screen widget: today's ayah and hadith (see DailyWidget.swift). Added to the Xcode
// project at prebuild by @bacons/apple-targets; EAS signs it as com.islamiclearning.muslimo.widget.
/** @type {import('@bacons/apple-targets/app.plugin').Config} */
module.exports = {
  type: "widget",
  name: "DailyWidget",
  displayName: "Muslimo",
  bundleIdentifier: ".widget",
  deploymentTarget: "15.1",
  icon: "../../assets/icon.png",
  frameworks: ["SwiftUI", "WidgetKit"],
  colors: {
    $accent: "#21B573",
    $widgetBackground: "#FFFFFF"
  }
};
