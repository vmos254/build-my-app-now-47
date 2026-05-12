import { useEffect, useRef } from "react";
import { Capacitor } from "@capacitor/core";
import { usePremium } from "@/hooks/usePremium";

// Web ad slot — replace data-ad-client and data-ad-slot with your AdSense values.
// Get them from https://adsense.google.com after your site is approved.
const ADSENSE_CLIENT = "ca-pub-XXXXXXXXXXXXXXXX"; // ← replace with your publisher ID
const ADSENSE_SLOT = "XXXXXXXXXX";                // ← replace with your ad unit slot

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

export const AdSlot = () => {
  const { isPremium } = usePremium();
  const pushed = useRef(false);

  useEffect(() => {
    // Only push once and only on web (native uses AdMob overlay)
    if (isPremium || Capacitor.isNativePlatform() || pushed.current) return;
    pushed.current = true;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // adsbygoogle not loaded yet — harmless
    }
  }, [isPremium]);

  // Premium users never see ads
  if (isPremium) return null;
  // Native platforms: AdMob banner is shown as a native overlay by useAdBanner hook
  if (Capacitor.isNativePlatform()) return null;

  return (
    <div className="overflow-hidden rounded-xl">
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={ADSENSE_CLIENT}
        data-ad-slot={ADSENSE_SLOT}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
};
