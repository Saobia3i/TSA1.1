"use client";

import { useEffect } from "react";

export default function RegisterSW() {
  useEffect(() => {
    if (
      process.env.NODE_ENV === "production" &&
      "serviceWorker" in navigator
    ) {
      navigator.serviceWorker
        .register("/sw.js", { updateViaCache: "none" })
        .then((reg) => reg.update())
        .catch(console.error);
    }
  }, []);

  return null;
}
