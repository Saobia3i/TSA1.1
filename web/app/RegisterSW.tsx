"use client";

import { useEffect } from "react";

export default function RegisterSW() {
  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;

    if (process.env.NODE_ENV === "production") {
      navigator.serviceWorker
        .register("/sw.js", { updateViaCache: "none" })
        .then((reg) => reg.update())
        .catch(console.error);
      return;
    }

    // In dev, ensure any previously installed SW is removed to avoid stale caches.
    navigator.serviceWorker
      .getRegistrations()
      .then((regs) => regs.forEach((reg) => reg.unregister()))
      .catch(console.error);

    if ("caches" in window) {
      caches.keys().then((keys) => keys.forEach((k) => caches.delete(k)));
    }
  }, []);

  return null;
}
