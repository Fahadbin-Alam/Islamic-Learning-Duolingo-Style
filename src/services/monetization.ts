import { monetizationMode } from "./monetizationConfig";
import { createSandboxClient, type MonetizationClient } from "./monetizationShared";

export type { MonetizationClient, RestoreResult } from "./monetizationShared";

// Web build: there is no App Store or Google Play here, so development uses the simulated store.
export const monetizationClient: MonetizationClient = createSandboxClient(monetizationMode);
