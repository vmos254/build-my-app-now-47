import { usePremium } from "@/hooks/usePremium";

export const AdSlot = ({ label = "Sponsored" }: { label?: string }) => {
  const { isPremium } = usePremium();
  if (isPremium) return null;
  return (
    <div className="rounded-xl border border-dashed border-border bg-background-deep/60 p-4 text-center">
      <div className="text-[0.6rem] uppercase tracking-[0.2em] text-muted-foreground font-ui">
        {label}
      </div>
      <div className="font-ui text-sm text-muted-foreground mt-2">
        Ad placement — hidden for Premium subscribers
      </div>
    </div>
  );
};
