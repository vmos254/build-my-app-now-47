import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Capacitor } from "@capacitor/core";

async function checkSupabasePremium(userId: string): Promise<boolean> {
  const { data } = await supabase
    .from("subscribers")
    .select("subscribed, subscription_end")
    .eq("user_id", userId)
    .maybeSingle();

  return (
    !!data?.subscribed &&
    (!data.subscription_end || new Date(data.subscription_end) > new Date())
  );
}

async function checkNativePremium(): Promise<boolean> {
  if (!Capacitor.isNativePlatform()) return false;
  try {
    const { checkNativeEntitlement } = await import("@/lib/purchases");
    return checkNativeEntitlement();
  } catch {
    return false;
  }
}

export function usePremium() {
  const { user } = useAuth();
  const [isPremium, setIsPremium] = useState(false);
  const [loading, setLoading] = useState(true);

  const check = useCallback(async () => {
    if (!user) {
      setIsPremium(false);
      setLoading(false);
      return;
    }
    setLoading(true);
    // Check Supabase first (authoritative), fall back to native entitlement
    const [supabaseResult, nativeResult] = await Promise.all([
      checkSupabasePremium(user.id),
      checkNativePremium(),
    ]);
    setIsPremium(supabaseResult || nativeResult);
    setLoading(false);
  }, [user]);

  useEffect(() => {
    let cancelled = false;
    check().then(() => {
      if (cancelled) return;
    });
    return () => { cancelled = true; };
  }, [check]);

  // refresh() is called by Pricing.tsx immediately after a successful purchase
  const refresh = useCallback(async () => {
    await check();
  }, [check]);

  // Kept for backwards-compat — premium status is set by Stripe webhook / RevenueCat
  const setIsPremiumLegacy = (_v: boolean) => {};

  return { isPremium, setIsPremium: setIsPremiumLegacy, loading, refresh };
}
