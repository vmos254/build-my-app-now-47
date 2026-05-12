import { Capacitor } from "@capacitor/core";
import { supabase } from "@/integrations/supabase/client";

// ─── Fill these in after creating your RevenueCat account ───────────────────
// Sign up free at https://app.revenuecat.com
// Dashboard → Project → API Keys → copy the iOS and Android public SDK keys
export const RC_API_KEY_IOS = "test_noeXGIExcnfYMzQyjHvAfDIZzHR";
export const RC_API_KEY_ANDROID = "test_noeXGIExcnfYMzQyjHvAfDIZzHR";

// Entitlement identifier — set this in RevenueCat dashboard under Entitlements
export const RC_ENTITLEMENT = "premium";

// Product IDs — must match exactly what you create in App Store Connect / Play Console
export const PRODUCT_IDS = {
  monthly: "lumen_premium_monthly",
  yearly: "lumen_premium_yearly",
} as const;

export async function initializePurchases(userId: string, userEmail: string) {
  if (!Capacitor.isNativePlatform()) return;
  const { Purchases } = await import("@revenuecat/purchases-capacitor");
  const apiKey =
    Capacitor.getPlatform() === "ios" ? RC_API_KEY_IOS : RC_API_KEY_ANDROID;
  await Purchases.configure({ apiKey, appUserID: userId });
  // Tie RevenueCat identity to Supabase user so purchases are linked across devices
  await Purchases.logIn({ appUserID: userId });
  void userEmail; // held for future webhook use
}

export async function getOfferings() {
  const { Purchases } = await import("@revenuecat/purchases-capacitor");
  const { current } = await Purchases.getOfferings();
  return current;
}

export async function purchasePackage(rcPackage: unknown) {
  const { Purchases } = await import("@revenuecat/purchases-capacitor");
  return Purchases.purchasePackage({ aPackage: rcPackage as never });
}

export async function restorePurchases() {
  const { Purchases } = await import("@revenuecat/purchases-capacitor");
  return Purchases.restorePurchases();
}

export async function checkNativeEntitlement(): Promise<boolean> {
  if (!Capacitor.isNativePlatform()) return false;
  const { Purchases } = await import("@revenuecat/purchases-capacitor");
  const { customerInfo } = await Purchases.getCustomerInfo();
  return !!customerInfo.entitlements.active[RC_ENTITLEMENT];
}

/** After a successful native purchase, write the entitlement to Supabase so
 *  usePremium (which reads the subscribers table) picks it up immediately. */
export async function syncPurchaseToSupabase(
  userId: string,
  userEmail: string,
  priceId: string,
  isYearly: boolean,
) {
  const now = new Date();
  const end = new Date(now);
  if (isYearly) {
    end.setFullYear(end.getFullYear() + 1);
  } else {
    end.setMonth(end.getMonth() + 1);
  }

  await supabase.from("subscribers").upsert(
    {
      user_id: userId,
      email: userEmail,
      subscribed: true,
      subscription_tier: "premium",
      price_id: priceId,
      environment: Capacitor.getPlatform(),
      subscription_end: end.toISOString(),
      cancel_at_period_end: false,
      updated_at: now.toISOString(),
    },
    { onConflict: "user_id" },
  );
}
