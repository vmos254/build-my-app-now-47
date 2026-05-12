import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Check, Sparkles, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePremium } from "@/hooks/usePremium";
import { useAuth } from "@/hooks/useAuth";
import { StripeEmbeddedCheckout } from "@/components/StripeEmbeddedCheckout";
import { Capacitor } from "@capacitor/core";
import {
  getOfferings,
  purchasePackage,
  restorePurchases,
  syncPurchaseToSupabase,
  PRODUCT_IDS,
  initializePurchases,
} from "@/lib/purchases";
import { toast } from "sonner";

// Web prices (Stripe, already live)
const WEB_PLANS = [
  {
    id: "monthly" as const,
    priceId: "premium_monthly",
    label: "Monthly",
    price: "$2.99",
    period: "/month",
    note: "Cancel anytime",
  },
  {
    id: "yearly" as const,
    priceId: "premium_yearly",
    label: "Yearly",
    price: "$20",
    period: "/year",
    note: "Save 44% — 2 months free",
    badge: "Best value",
  },
];

// Native prices (App Store / Play Store via RevenueCat)
const NATIVE_PLANS = [
  {
    id: "monthly" as const,
    productId: PRODUCT_IDS.monthly,
    label: "Monthly",
    price: "$4.99",
    period: "/month",
    note: "Cancel anytime",
    isYearly: false,
  },
  {
    id: "yearly" as const,
    productId: PRODUCT_IDS.yearly,
    label: "Yearly",
    price: "$39.99",
    period: "/year",
    note: "Save 33% — 4 months free",
    badge: "Best value",
    isYearly: true,
  },
];

const FEATURES = [
  "Ad-free reading experience",
  "Unlimited bookmarks & highlights",
  "Daily readings from the Vatican",
  "Full reading plan with progress tracking",
  "Priority support",
  "Sync across all your devices",
];

const isNative = Capacitor.isNativePlatform();

export const Pricing = () => {
  const [selected, setSelected] = useState<"monthly" | "yearly">("yearly");
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [purchasing, setPurchasing] = useState(false);
  const [restoring, setRestoring] = useState(false);
  // rcOfferings holds the RevenueCat Package objects keyed by product ID
  const [rcPackages, setRcPackages] = useState<Record<string, unknown>>({});

  const { isPremium, refresh } = usePremium();
  const { user } = useAuth();

  // Initialize RevenueCat and load offerings when on native
  useEffect(() => {
    if (!isNative || !user) return;
    let cancelled = false;
    (async () => {
      try {
        await initializePurchases(user.id, user.email ?? "");
        const offering = await getOfferings();
        if (cancelled || !offering) return;
        const map: Record<string, unknown> = {};
        for (const pkg of offering.availablePackages) {
          // pkg.product.identifier matches the product ID you created in the store
          const id: string = (pkg as { product: { identifier: string } }).product.identifier;
          map[id] = pkg;
        }
        setRcPackages(map);
      } catch {
        // Offerings may not be available in simulator — silently ignore
      }
    })();
    return () => { cancelled = true; };
  }, [user]);

  const handleNativePurchase = async () => {
    if (!user) return;
    const plan = NATIVE_PLANS.find((p) => p.id === selected)!;
    const pkg = rcPackages[plan.productId];
    if (!pkg) {
      toast.error("Products not loaded yet. Please try again in a moment.");
      return;
    }
    setPurchasing(true);
    try {
      await purchasePackage(pkg);
      await syncPurchaseToSupabase(
        user.id,
        user.email ?? "",
        plan.productId,
        plan.isYearly,
      );
      await refresh();
      toast.success("Welcome to Lumen Premium!");
    } catch (e: unknown) {
      const err = e as { userCancelled?: boolean; message?: string };
      if (!err?.userCancelled) {
        toast.error(err?.message ?? "Purchase failed. Please try again.");
      }
    } finally {
      setPurchasing(false);
    }
  };

  const handleRestore = async () => {
    if (!user) return;
    setRestoring(true);
    try {
      await restorePurchases();
      await refresh();
      if (isPremium) {
        toast.success("Purchases restored!");
      } else {
        toast.info("No active subscription found to restore.");
      }
    } catch {
      toast.error("Restore failed. Please try again.");
    } finally {
      setRestoring(false);
    }
  };

  // Web checkout flow (Stripe) — unchanged
  const selectedWebPlan = WEB_PLANS.find((p) => p.id === selected)!;
  if (!isNative && checkoutOpen && user) {
    return (
      <div className="container max-w-2xl mx-auto px-4 py-8 animate-fade-in">
        <button
          onClick={() => setCheckoutOpen(false)}
          className="text-sm font-ui text-muted-foreground hover:text-foreground mb-4"
        >
          ← Back to plans
        </button>
        <StripeEmbeddedCheckout
          priceId={selectedWebPlan.priceId}
          customerEmail={user.email ?? undefined}
          userId={user.id}
          returnUrl={`${window.location.origin}/checkout/return?session_id={CHECKOUT_SESSION_ID}`}
        />
      </div>
    );
  }

  const plans = isNative ? NATIVE_PLANS : WEB_PLANS;

  return (
    <div className="container max-w-xl mx-auto px-4 py-10 animate-fade-in">
      <header className="text-center">
        <div className="w-14 h-14 mx-auto rounded-full bg-gradient-gold grid place-items-center shadow-gold">
          <Sparkles className="w-6 h-6 text-secondary-foreground" strokeWidth={1.5} />
        </div>
        <h1 className="font-display text-4xl mt-5 text-foreground">Lumen Premium</h1>
        <p className="text-muted-foreground mt-3 font-ui">
          Go deeper into Sacred Scripture, ad-free.
        </p>
        <div className="gold-divider mt-5" />
      </header>

      <div className="mt-8 grid grid-cols-2 gap-3">
        {plans.map((p) => {
          const active = selected === p.id;
          return (
            <button
              key={p.id}
              onClick={() => setSelected(p.id)}
              className={cn(
                "relative text-left p-5 rounded-2xl border-2 transition-all",
                active
                  ? "border-primary bg-card shadow-page"
                  : "border-border bg-card/60 hover:border-muted-foreground/40",
              )}
            >
              {"badge" in p && p.badge && (
                <span className="absolute -top-2.5 right-3 text-[0.6rem] uppercase tracking-widest font-ui font-semibold bg-gradient-gold text-secondary-foreground px-2 py-0.5 rounded-full">
                  {p.badge}
                </span>
              )}
              <div className="text-xs uppercase tracking-widest font-ui text-muted-foreground">
                {p.label}
              </div>
              <div className="mt-1 flex items-baseline gap-1">
                <span className="font-display text-3xl text-foreground">{p.price}</span>
                <span className="text-sm text-muted-foreground font-ui">{p.period}</span>
              </div>
              <div className="text-[0.7rem] mt-2 font-ui text-muted-foreground">{p.note}</div>
            </button>
          );
        })}
      </div>

      <ul className="mt-8 space-y-3">
        {FEATURES.map((f) => (
          <li key={f} className="flex items-start gap-3 font-ui text-sm">
            <span className="w-5 h-5 rounded-full bg-primary/10 grid place-items-center shrink-0 mt-0.5">
              <Check className="w-3 h-3 text-primary" strokeWidth={3} />
            </span>
            <span className="text-foreground">{f}</span>
          </li>
        ))}
      </ul>

      {!user ? (
        <Link
          to="/auth"
          className="block w-full mt-8 py-4 rounded-full bg-gradient-burgundy text-primary-foreground font-ui font-semibold shadow-page hover:shadow-gold transition-shadow text-center"
        >
          Sign in to subscribe
        </Link>
      ) : isNative ? (
        <>
          <button
            onClick={handleNativePurchase}
            disabled={isPremium || purchasing}
            className="w-full mt-8 py-4 rounded-full bg-gradient-burgundy text-primary-foreground font-ui font-semibold shadow-page hover:shadow-gold transition-shadow disabled:opacity-60"
          >
            {isPremium
              ? "✓ You're Premium"
              : purchasing
              ? "Processing…"
              : `Subscribe — ${selected === "yearly" ? "$39.99/year" : "$4.99/month"}`}
          </button>
          <button
            onClick={handleRestore}
            disabled={restoring || isPremium}
            className="w-full mt-3 py-3 rounded-full border border-border text-muted-foreground font-ui text-sm flex items-center justify-center gap-2 hover:border-primary/40 hover:text-foreground transition-colors disabled:opacity-40"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            {restoring ? "Restoring…" : "Restore Purchases"}
          </button>
        </>
      ) : (
        <button
          onClick={() => setCheckoutOpen(true)}
          disabled={isPremium}
          className="w-full mt-8 py-4 rounded-full bg-gradient-burgundy text-primary-foreground font-ui font-semibold shadow-page hover:shadow-gold transition-shadow disabled:opacity-60"
        >
          {isPremium ? "✓ You're Premium" : `Subscribe — ${selected === "yearly" ? "$20/year" : "$2.99/month"}`}
        </button>
      )}

      <p className="text-[0.7rem] text-muted-foreground text-center mt-5 font-ui leading-relaxed">
        {isNative
          ? "Payment will be charged to your Apple/Google account. Subscription auto-renews unless cancelled at least 24 hours before the end of the current period."
          : "Web subscriptions are processed securely. Apple Pay and Google Pay are supported automatically on compatible devices."}
      </p>
    </div>
  );
};
