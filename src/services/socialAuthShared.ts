export type SocialIdentity = {
  provider: "google" | "apple";
  /** The provider's id for this person (the token's "sub"). */
  subject: string;
  email: string;
  /** Apple sends the name only the first time someone signs in to the app. */
  name?: string;
  /** Signed token the backend checks with Google or Apple before it trusts the email. */
  idToken: string;
};

export type SocialSignInResult =
  | { status: "ok"; identity: SocialIdentity }
  | { status: "cancelled" }
  | { status: "unavailable" }
  | { status: "error"; message: string };

/**
 * Reads the claims of a JWT without checking its signature. On the device this only fills in the
 * email and id the provider SDK handed over; the backend verifies the signature before it trusts them.
 */
export function readTokenClaims(token: string): Record<string, unknown> | undefined {
  const part = token.split(".")[1];

  if (!part) {
    return undefined;
  }

  try {
    const base64 = part.replace(/-/g, "+").replace(/_/g, "/").padEnd(Math.ceil(part.length / 4) * 4, "=");
    const binary = atob(base64);
    // UTF-8 bytes to text without TextDecoder, which Hermes may not have.
    const json = decodeURIComponent(Array.from(binary, (char) => `%${char.charCodeAt(0).toString(16).padStart(2, "0")}`).join(""));
    return JSON.parse(json) as Record<string, unknown>;
  } catch {
    return undefined;
  }
}
