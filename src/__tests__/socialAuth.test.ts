jest.mock("../config/auth", () => ({ GOOGLE_SIGN_IN_CONFIG: { webClientId: "web-id.apps.googleusercontent.com", iosClientId: "ios-id.apps.googleusercontent.com" } }));
jest.mock("@react-native-google-signin/google-signin", () => ({
  GoogleSignin: {
    configure: jest.fn(),
    hasPlayServices: jest.fn(async () => true),
    signIn: jest.fn(),
    signOut: jest.fn(async () => null)
  },
  isErrorWithCode: (error: unknown) => Boolean(error && typeof error === "object" && "code" in error),
  statusCodes: { SIGN_IN_CANCELLED: "SIGN_IN_CANCELLED", IN_PROGRESS: "IN_PROGRESS", PLAY_SERVICES_NOT_AVAILABLE: "PLAY_SERVICES_NOT_AVAILABLE" }
}));

import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { signInWithGoogle } from "../services/socialAuth.native";
import { readTokenClaims } from "../services/socialAuthShared";

function fakeToken(claims: Record<string, unknown>) {
  const part = (value: object) => Buffer.from(JSON.stringify(value)).toString("base64url");
  return `${part({ alg: "RS256" })}.${part(claims)}.sig`;
}

describe("social sign-in on the phone", () => {
  it("reads token claims, including non-English names", () => {
    expect(readTokenClaims(fakeToken({ sub: "42", name: "عائشة" }))).toEqual({ sub: "42", name: "عائشة" });
    expect(readTokenClaims("not-a-token")).toBeUndefined();
  });

  it("hands back the Google id token, email and name", async () => {
    (GoogleSignin.signIn as jest.Mock).mockResolvedValue({
      type: "success",
      data: { idToken: fakeToken({ sub: "google-sub" }), user: { id: "google-sub", email: "amina@gmail.com", name: "Amina Khan", givenName: "Amina" } }
    });
    const result = await signInWithGoogle();
    expect(GoogleSignin.configure).toHaveBeenCalledWith({ webClientId: "web-id.apps.googleusercontent.com", iosClientId: "ios-id.apps.googleusercontent.com" });
    expect(result).toMatchObject({ status: "ok", identity: { provider: "google", subject: "google-sub", email: "amina@gmail.com", name: "Amina Khan" } });
  });

  it("treats a closed picker as cancelled, not an error", async () => {
    (GoogleSignin.signIn as jest.Mock).mockResolvedValue({ type: "cancelled", data: null });
    expect(await signInWithGoogle()).toEqual({ status: "cancelled" });
    (GoogleSignin.signIn as jest.Mock).mockRejectedValue(Object.assign(new Error("cancelled"), { code: "SIGN_IN_CANCELLED" }));
    expect(await signInWithGoogle()).toEqual({ status: "cancelled" });
  });

  it("reports a missing id token (no web client id on the Google side) as an error", async () => {
    (GoogleSignin.signIn as jest.Mock).mockResolvedValue({ type: "success", data: { idToken: null, user: { id: "x", email: "a@gmail.com", name: null, givenName: null } } });
    expect((await signInWithGoogle()).status).toBe("error");
  });
});
