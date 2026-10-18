jest.mock("@react-native-async-storage/async-storage", () =>
  require("@react-native-async-storage/async-storage/jest/async-storage-mock")
);

import { setStoredItem } from "../services/appStorage";
import {
  clearLocalAuthAccount,
  createLocalAuthAccount,
  hashLocalPassword,
  loadLocalAuthAccount,
  loginLocalAuthAccount
} from "../services/localAuth";
import { sha256Hex } from "../utils/sha256";

const createdAt = "2026-10-18T00:00:00.000Z";

describe("sha256Hex", () => {
  it("matches the standard test vectors", () => {
    expect(sha256Hex("")).toBe("e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855");
    expect(sha256Hex("abc")).toBe("ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad");
    expect(sha256Hex("abcdbcdecdefdefgefghfghighijhijkijkljklmklmnlmnomnopnopq")).toBe(
      "248d6a61d20638b8e5c026930c3e6039a33ce45964ff2167f6ecedd419db06c1"
    );
  });

  it("encodes non-ASCII text as UTF-8", () => {
    expect(sha256Hex("سلام")).toBe("bda1fa48345336618741fd2c4bc02809eb099c49a9b02fb5056401ab6d4dc3e6");
    expect(sha256Hex("🌙")).toBe("cf086bebb18884ffec1bd25a8c7858cc64088d3983b06c011411e1959426cffe");
    expect(sha256Hex("é")).toBe(sha256Hex("é"));
    expect(sha256Hex("é")).not.toBe(sha256Hex("e"));
  });
});

describe("local account", () => {
  afterEach(() => clearLocalAuthAccount());

  it("never stores the raw password", () => {
    createLocalAuthAccount({ name: "Amina", email: " Amina@Example.com ", password: "bismillah-123", createdAt });

    const saved = loadLocalAuthAccount();
    expect(saved?.email).toBe("amina@example.com");
    expect(saved?.password).toMatch(/^sha256:[0-9a-f]+:[0-9a-f]{64}$/);
    expect(saved?.password).not.toContain("bismillah-123");
  });

  it("signs in with the right password only", () => {
    createLocalAuthAccount({ name: "Amina", email: "amina@example.com", password: "bismillah-123", createdAt });

    expect(loginLocalAuthAccount("AMINA@example.com", "bismillah-123")?.name).toBe("Amina");
    expect(loginLocalAuthAccount("amina@example.com", "wrong-password")).toBeNull();
    expect(loginLocalAuthAccount("other@example.com", "bismillah-123")).toBeNull();
  });

  it("upgrades accounts saved with a plain password by older versions", () => {
    setStoredItem("sira-path-local-auth", JSON.stringify({ name: "Bilal", email: "bilal@example.com", password: "old-plain-pass", createdAt }));

    expect(loginLocalAuthAccount("bilal@example.com", "old-plain-pass")?.name).toBe("Bilal");
    expect(loadLocalAuthAccount()?.password).toMatch(/^sha256:/);
    expect(loginLocalAuthAccount("bilal@example.com", "old-plain-pass")?.name).toBe("Bilal");
  });

  it("salts each hash", () => {
    expect(hashLocalPassword("same-password")).not.toBe(hashLocalPassword("same-password"));
  });
});
