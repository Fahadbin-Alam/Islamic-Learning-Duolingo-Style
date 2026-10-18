jest.mock("@react-native-async-storage/async-storage", () =>
  require("@react-native-async-storage/async-storage/jest/async-storage-mock")
);

type BackendModule = typeof import("../services/backendSync");

function loadBackend(baseUrl: string | undefined): BackendModule {
  let loaded: BackendModule | undefined;
  jest.isolateModules(() => {
    if (baseUrl === undefined) {
      delete process.env.EXPO_PUBLIC_API_BASE_URL;
    } else {
      process.env.EXPO_PUBLIC_API_BASE_URL = baseUrl;
    }
    loaded = require("../services/backendSync");
  });
  return loaded as BackendModule;
}

function jsonResponse(status: number, body: unknown) {
  return { ok: status >= 200 && status < 300, status, json: async () => body } as Response;
}

describe("backend sync", () => {
  const originalFetch = global.fetch;
  const originalDev = (global as { __DEV__?: boolean }).__DEV__;

  afterEach(() => {
    global.fetch = originalFetch;
    (global as { __DEV__?: boolean }).__DEV__ = originalDev;
    delete process.env.EXPO_PUBLIC_API_BASE_URL;
  });

  it("stays offline in a release build with no API address instead of calling localhost", async () => {
    (global as { __DEV__?: boolean }).__DEV__ = false;
    const fetchMock = jest.fn();
    global.fetch = fetchMock;
    const backend = loadBackend(undefined);

    expect(backend.isBackendConfigured()).toBe(false);
    await expect(backend.loginRemoteAccount({ email: "a@b.co", password: "12345678" })).rejects.toThrow(/network/i);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("uses the configured API address without a trailing slash", async () => {
    const fetchMock = jest.fn().mockResolvedValue(jsonResponse(200, { token: "t", account: {}, user: {}, socialHub: {} }));
    global.fetch = fetchMock;
    const backend = loadBackend("https://api.example.org/");

    await backend.loginRemoteAccount({ email: "a@b.co", password: "12345678" });

    expect(fetchMock.mock.calls[0][0]).toBe("https://api.example.org/api/auth/login");
  });

  it("surfaces the server's message and status on a rejected request", async () => {
    global.fetch = jest.fn().mockResolvedValue(jsonResponse(401, { detail: "Invalid email or password." }));
    const backend = loadBackend("https://api.example.org");

    const error = await backend.loginRemoteAccount({ email: "a@b.co", password: "12345678" }).catch((caught) => caught);

    expect(error).toBeInstanceOf(backend.BackendRequestError);
    expect(error.status).toBe(401);
    expect(error.message).toBe("Invalid email or password.");
  });

  it("keeps the saved session when the phone is offline but drops it when the token is rejected", async () => {
    const backend = loadBackend("https://api.example.org");
    backend.setSessionToken("saved-token");

    global.fetch = jest.fn().mockRejectedValue(new TypeError("Network request failed"));
    expect(await backend.hydrateRemoteSession()).toBeNull();
    expect(backend.getSessionToken()).toBe("saved-token");

    global.fetch = jest.fn().mockResolvedValue(jsonResponse(401, { detail: "Session expired." }));
    expect(await backend.hydrateRemoteSession()).toBeNull();
    expect(backend.getSessionToken()).toBeNull();
  });

  it("deletes the account on the server and forgets the session", async () => {
    const fetchMock = jest.fn().mockResolvedValue(jsonResponse(200, { ok: true }));
    global.fetch = fetchMock;
    const backend = loadBackend("https://api.example.org");
    backend.setSessionToken("saved-token");

    await backend.deleteRemoteAccount();

    expect(fetchMock).toHaveBeenCalledWith(
      "https://api.example.org/api/profile/me",
      expect.objectContaining({ method: "DELETE", headers: expect.objectContaining({ Authorization: "Bearer saved-token" }) })
    );
    expect(backend.getSessionToken()).toBeNull();
  });
});
