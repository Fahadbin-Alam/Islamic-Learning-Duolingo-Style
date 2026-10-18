import React, { useEffect, useState } from "react";
import TopicApp from "./src/TopicApp";
import { hydrateAppStorage } from "./src/services/appStorage";

export default function App() {
  const [storageReady, setStorageReady] = useState(false);

  useEffect(() => {
    void hydrateAppStorage().then(() => setStorageReady(true));
  }, []);

  // Saved progress is read synchronously on first render, so wait for it to load from the device.
  return storageReady ? <TopicApp /> : null;
}
