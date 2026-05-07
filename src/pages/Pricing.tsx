import { useState } from "react";
import { Link } from "react-router-dom";
import { Check, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePremium } from "@/hooks/usePremium";
import { useAuth } from "@/hooks/useAuth";
import { StripeEmbeddedCheckout } from "@/components/StripeEmbeddedCheckout";

const PLANS = [
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

const FEATURES = [
  "Ad-free reading experience",
  "Unlimited bookmarks & highlights",
  "Daily readings from the Vatican",
  "Full reading plan with progress tracking",
  "Priority support",
  "Sync across all your devices",
];

export const Pricing = () => {
  const [selected, setSelected] = useState<"monthly" | "yearly">("yearly");
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const { isPremium } = usePremium();
  const { user } = useAuth();

  const selectedPlan = PLANS.find((p) => p.id === selected)!;

  if (checkoutOpen && user) {
    return (
      <div className="container max-w-2xl mx-auto px-4 py-8 animate-fade-in">
        <button
          onClick={() => setCheckoutOpen(false)}
          className="text-sm font-ui text-muted-foreground hover:text-foreground mb-4"
        >
          ← Back to plans
        </button>
        <StripeEmbeddedCheckout
          priceId={selectedPlan.priceId}
          customerEmail={user.email ?? undefined}
          userId={user.id}
          returnUrl={`${window.location.origin}/checkout/return?session_id={CHECKOUT_SESSION_ID}`}
        />
      </div>
    );
  }

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
        {PLANS.map((p) => {
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
              {p.badge && (
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
        Web subscriptions are processed securely. Apple Pay and Google Pay are
        supported automatically on compatible devices.
      </p>
    </div>
  );
};
