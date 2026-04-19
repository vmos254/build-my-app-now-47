import { PremiumGate } from "@/components/PremiumGate";
import { usePremium } from "@/hooks/usePremium";

export const DailyReadings = () => {
  const { isPremium } = usePremium();

  if (!isPremium) {
    return (
      <PremiumGate
        title="Vatican Daily Readings"
        description="Receive the daily Mass readings from the Vatican every morning — Gospel, responsorial Psalm, and more. Available with Premium."
      />
    );
  }

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="container max-w-2xl mx-auto px-4 py-8 animate-fade-in">
      <header className="text-center mb-8">
        <div className="text-xs uppercase tracking-[0.25em] text-secondary font-ui font-semibold">
          Today's Readings
        </div>
        <h1 className="font-display text-3xl mt-2 text-foreground">{today}</h1>
        <div className="gold-divider mt-4" />
      </header>

      <div className="space-y-6">
        {[
          { label: "First Reading", ref: "Acts 2:1–11" },
          { label: "Responsorial Psalm", ref: "Psalm 104" },
          { label: "Second Reading", ref: "1 Corinthians 12:3b–7, 12–13" },
          { label: "Gospel", ref: "John 20:19–23" },
        ].map((r) => (
          <article key={r.label} className="bg-card rounded-xl border border-border/60 p-5">
            <div className="text-xs font-ui font-semibold text-primary uppercase tracking-wider">
              {r.label}
            </div>
            <h3 className="font-display text-2xl mt-1 text-foreground">{r.ref}</h3>
            <p className="text-sm text-muted-foreground font-ui mt-2">
              Live daily readings from the Vatican will appear here once the feed is connected.
            </p>
          </article>
        ))}
      </div>
    </div>
  );
};
