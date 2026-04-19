import { Link } from "react-router-dom";
import { Trash2 } from "lucide-react";
import { useBookmarks, FREE_BOOKMARK_LIMIT } from "@/hooks/useBookmarks";
import { usePremium } from "@/hooks/usePremium";
import { cn } from "@/lib/utils";

const COLORS = [
  { key: "gold", bg: "bg-highlight-gold" },
  { key: "rose", bg: "bg-highlight-rose" },
  { key: "sky", bg: "bg-highlight-sky" },
  { key: "sage", bg: "bg-highlight-sage" },
] as const;

export const Bookmarks = () => {
  const { isPremium } = usePremium();
  const { bookmarks, setColor, remove } = useBookmarks(isPremium);

  return (
    <div className="container max-w-2xl mx-auto px-4 py-8 animate-fade-in">
      <header className="text-center mb-6">
        <h1 className="font-display text-4xl text-foreground">Saved Verses</h1>
        <div className="gold-divider mt-3" />
        <p className="text-sm text-muted-foreground mt-3 font-ui">
          {isPremium ? `${bookmarks.length} saved` : `${bookmarks.length} of ${FREE_BOOKMARK_LIMIT} free`}
        </p>
      </header>

      {bookmarks.length === 0 && (
        <div className="text-center py-16">
          <p className="text-muted-foreground font-ui">
            No saved verses yet. Tap any verse number while reading to save it.
          </p>
          <Link
            to="/bible"
            className="inline-block mt-6 px-5 py-2.5 rounded-full bg-primary text-primary-foreground font-ui text-sm"
          >
            Open the Bible
          </Link>
        </div>
      )}

      <div className="space-y-3">
        {bookmarks.map((b) => (
          <article key={b.id} className="bg-card rounded-xl border border-border/60 p-4 shadow-soft">
            <div className="flex items-start justify-between gap-3">
              <Link
                to={`/bible/${b.bookId}/${b.chapter}#v${b.verse}`}
                className="text-xs font-ui font-semibold text-primary uppercase tracking-wider hover:underline"
              >
                {b.bookName} {b.chapter}:{b.verse}
              </Link>
              <button
                onClick={() => remove(b.id)}
                className="text-muted-foreground hover:text-destructive transition-colors"
                aria-label="Remove bookmark"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            <p className="font-scripture text-lg mt-2 leading-snug text-foreground">{b.text}</p>
            <div className="mt-3 flex items-center gap-2">
              <span className="text-[0.65rem] uppercase tracking-widest text-muted-foreground font-ui mr-1">
                Highlight
              </span>
              {COLORS.map((c) => (
                <button
                  key={c.key}
                  onClick={() => setColor(b.id, b.color === c.key ? null : c.key)}
                  className={cn(
                    "w-5 h-5 rounded-full border-2 transition-all",
                    c.bg,
                    b.color === c.key ? "border-primary scale-110" : "border-transparent hover:border-muted-foreground/40"
                  )}
                  aria-label={`Highlight ${c.key}`}
                />
              ))}
            </div>
          </article>
        ))}
      </div>

      {!isPremium && bookmarks.length >= FREE_BOOKMARK_LIMIT && (
        <Link
          to="/pricing"
          className="block mt-8 rounded-2xl bg-gradient-burgundy p-5 text-center text-primary-foreground shadow-page"
        >
          <p className="font-display text-xl">Save unlimited verses with Premium</p>
          <p className="text-sm font-ui opacity-90 mt-1">From $2.99/month — ad-free, plus Vatican daily readings</p>
        </Link>
      )}
    </div>
  );
};
