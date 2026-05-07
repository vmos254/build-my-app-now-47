import { useSearchParams, Link } from "react-router-dom";
import { Check } from "lucide-react";

export default function CheckoutReturn() {
  const [params] = useSearchParams();
  const sessionId = params.get("session_id");

  return (
    <div className="container max-w-md mx-auto px-4 py-16 text-center animate-fade-in">
      <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 grid place-items-center">
        <Check className="w-8 h-8 text-primary" strokeWidth={3} />
      </div>
      <h1 className="font-display text-3xl mt-6 text-foreground">Thank you</h1>
      <p className="text-muted-foreground mt-3 font-ui">
        {sessionId
          ? "Your subscription is being activated. Premium will unlock in a moment."
          : "We couldn't find your session details."}
      </p>
      <Link
        to="/"
        className="inline-block mt-8 px-6 py-3 rounded-full bg-gradient-burgundy text-primary-foreground font-ui font-semibold shadow-page"
      >
        Back to Lumen
      </Link>
    </div>
  );
}
