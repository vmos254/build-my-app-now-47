// Single source of truth for free vs premium gating.
// Backed by Lovable Cloud subscriber state once Stripe is wired up.

import { useEffect, useState } from "react";

const KEY = "lumen.premium.preview";

/**
 * Temporary client-side flag for previewing the premium experience.
 * Will be replaced by a server-verified subscription check.
 */
export function usePremium() {
  const [isPremium, setIsPremium] = useState<boolean>(() => {
    try {
      return localStorage.getItem(KEY) === "1";
    } catch {
      return false;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(KEY, isPremium ? "1" : "0");
    } catch {
      /* ignore */
    }
  }, [isPremium]);

  return { isPremium, setIsPremium };
}
