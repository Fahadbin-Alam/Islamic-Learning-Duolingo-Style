import { removeStoredItem } from "./appStorage";

// Older builds kept a simulated crew on the device. The crew now lives on the server, so this only
// clears that leftover data when someone logs out or deletes their account.
const STORAGE_KEY = "sira-path-social-hub";

export function clearSocialHubState() {
  removeStoredItem(STORAGE_KEY);
}
