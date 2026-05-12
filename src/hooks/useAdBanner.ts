import { useEffect } from "react";
import { Capacitor } from "@capacitor/core";
import { showBanner, removeBanner } from "@/lib/admob";
import { usePremium } from "@/hooks/usePremium";

// Shows a native AdMob banner at the bottom of the screen while the component
// that calls this hook is mounted. Cleans up on unmount.
export function useAdBanner() {
  const { isPremium } = usePremium();

  useEffect(() => {
    if (!Capacitor.isNativePlatform() || isPremium) return;
    showBanner();
    return () => {
      removeBanner();
    };
  }, [isPremium]);
}
