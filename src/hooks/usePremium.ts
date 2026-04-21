// Server-verified premium status, backed by the `subscribers` table in Lovable Cloud.
// Anonymous users are never premium. Stripe checkout will populate the subscribers row.

import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

export function usePremium() {
  const { user } = useAuth();
  const [isPremium, setIsPremiumState] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    if (!user) {
      setIsPremiumState(false);
      setLoading(false);
      return;
    }

    setLoading(true);
    (async () => {
      const { data } = await supabase
        .from("subscribers")
        .select("subscribed, subscription_end")
        .eq("user_id", user.id)
        .maybeSingle();

      if (cancelled) return;

      const active =
        !!data?.subscribed &&
        (!data.subscription_end || new Date(data.subscription_end) > new Date());

      setIsPremiumState(active);
      setLoading(false);
    })();

    return () => {
      cancelled = true;
    };
  }, [user]);

  // Kept for backwards-compat with the Pricing preview button. Once Stripe
  // is wired up, this becomes a no-op (server is the source of truth).
  const setIsPremium = (_v: boolean) => {
    // intentionally unused — premium status is set by Stripe webhook
  };

  return { isPremium, setIsPremium, loading };
}
