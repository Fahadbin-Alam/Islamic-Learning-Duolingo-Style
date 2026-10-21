// Fails CI when the resolved Expo config drifts from what the store submissions rely on.
// Run with: node scripts/check-release-config.mjs
import { execFileSync } from "node:child_process";

const config = JSON.parse(
  execFileSync("npx", ["expo", "config", "--type", "public", "--json"], {
    encoding: "utf8",
    env: { ...process.env, CI: "1" }
  })
);

const problems = [];
const expect = (condition, message) => {
  if (!condition) {
    problems.push(message);
  }
};

expect(/^\d+\.\d+\.\d+$/.test(config.version ?? ""), "expo.version must be a semantic version like 1.0.0");
expect(config.ios?.bundleIdentifier === "com.islamiclearning.muslimo", "iOS bundle id changed; the App Store record is tied to it");
expect(config.android?.package === "com.islamiclearning.muslimo", "Android package changed; the Play listing is tied to it");
expect(config.ios?.infoPlist?.ITSAppUsesNonExemptEncryption === false, "iOS export-compliance flag is missing");
expect(Array.isArray(config.ios?.privacyManifests?.NSPrivacyAccessedAPITypes), "iOS privacy manifest is missing");

const blocked = new Set(config.android?.blockedPermissions ?? []);
for (const permission of ["android.permission.RECORD_AUDIO", "android.permission.SYSTEM_ALERT_WINDOW", "android.permission.FOREGROUND_SERVICE_MEDIA_PLAYBACK"]) {
  expect(blocked.has(permission), `${permission} must stay blocked; the app never uses it and Play asks for a justification`);
}

const plugins = (config.plugins ?? []).map((plugin) => (Array.isArray(plugin) ? plugin : [plugin, {}]));
const audio = plugins.find(([name]) => name === "expo-audio");
expect(audio && audio[1].microphonePermission === false, "expo-audio must not request the microphone");
expect(audio && audio[1].enableBackgroundPlayback === false, "expo-audio must not enable background playback");
const ads = plugins.find(([name]) => name === "react-native-google-mobile-ads");
expect(ads && /^ca-app-pub-\d+~\d+$/.test(ads[1].androidAppId) && /^ca-app-pub-\d+~\d+$/.test(ads[1].iosAppId), "AdMob app ids are malformed");
expect(ads && (ads[1].skAdNetworkItems ?? []).includes("cstr6suwn9.skadnetwork"), "Google's SKAdNetwork id is missing");

if (problems.length > 0) {
  console.error("Release config problems:\n- " + problems.join("\n- "));
  process.exit(1);
}

console.log(`Release config OK: ${config.name} ${config.version} (${config.android.package})`);
