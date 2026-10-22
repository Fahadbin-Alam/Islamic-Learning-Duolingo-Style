import type { SocialSignInResult } from "./socialAuthShared";

export type { SocialIdentity, SocialSignInResult } from "./socialAuthShared";

// Web build: Google and Apple sign-in run through the native SDKs on Android and iOS
// (socialAuth.native.ts). The web preview keeps email sign-up only.

export function isGoogleSignInAvailable() {
  return false;
}

export async function isAppleSignInAvailable() {
  return false;
}

export async function signInWithGoogle(): Promise<SocialSignInResult> {
  return { status: "unavailable" };
}

export async function signInWithApple(): Promise<SocialSignInResult> {
  return { status: "unavailable" };
}

export async function signOutOfProviders() {}
