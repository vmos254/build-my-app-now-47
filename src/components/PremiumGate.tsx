import { Lock } from "lucide-react";
import { Link } from "react-router-dom";

interface PremiumGateProps {
  title: string;
  description: string;
}

export const PremiumGate = ({ title, description }: PremiumGateProps) => {
  return (
    <div className="container max-w-2xl mx-auto px-4 py-12 text-center animate-fade-in">
      <div className="w-16 h-16 rounded-full bg-gradient-gold mx-auto grid place-items-center shadow-gold">
        <Lock className="w-7 h-7 text-secondary-foreground" strokeWidth={1.5} />
      </div>
      <h2 className="font-display text-3xl mt-6 text-foreground">{title}</h2>
      <p className="text-muted-foreground mt-3 max-w-md mx-auto">{description}</p>
      <div className="gold-divider my-8" />
      <Link
        to="/pricing"
        className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-gradient-burgundy text-primary-foreground font-ui font-medium shadow-soft hover:shadow-gold transition-shadow"
      >
        Unlock Premium — from $2.99/mo
      </Link>
    </div>
  );
};
