import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Calendar, Sparkles } from "lucide-react";
import heroImage from "@/assets/hero-bible.jpg";
import { verseOfTheDay } from "@/data/chapters";
import { useContinueReading } from "@/hooks/useBookmarks";
import { usePremium } from "@/hooks/usePremium";
import { AdSlot } from "@/components/AdSlot";

export const Home = () => {
  const votd = verseOfTheDay();
  const { last } = useContinueReading();
  const { isPremium } = usePremium();

  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[hsl(25_30%_8%/0.55)] via-[hsl(25_30%_8%/0.45)] to-background" />
        <div className="relative container max-w-3xl mx-auto px-4 pt-12 pb-16 text-center">
          <span className="inline-flex items-center gap-1.5 text-[0.7rem] uppercase tracking-[0.2em] text-gold-soft font-ui font-medium">
            <Sparkles className="w-3 h-3" /> Lumen — The Catholic Bible
          </span>
          <h1 className="font-display text-5xl md:text-6xl mt-3 text-[hsl(40_40%_96%)] leading-tight">
            The Catholic Bible,
            <br />
            <em className="text-gold-soft font-medium">in your pocket.</em>
          </h1>
          <p className="text-[hsl(40_30%_90%/0.85)] mt-4 max-w-md mx-auto font-ui text-sm">
            All 73 books. Daily readings from the Vatican. Beautifully simple.
          </p>
          <Link
            to="/bible"
            className="inline-flex items-center gap-2 mt-7 px-6 py-3 rounded-full bg-gradient-gold text-secondary-foreground font-ui font-medium shadow-gold hover:translate-y-[-1px] transition-transform"
          >
            Open the Bible <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <div className="container max-w-3xl mx-auto px-4 -mt-6 space-y-6">
        {/* Verse of the day */}
        <article className="bg-card rounded-2xl shadow-page p-6 border border-border/60">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-primary font-ui font-semibold">
            <Calendar className="w-3.5 h-3.5" />
            Verse of the Day
          </div>
          <blockquote className="font-scripture text-2xl md:text-3xl mt-4 leading-snug text-foreground italic">
            “{votd.text}”
          </blockquote>
          <div className="gold-divider my-5" />
          <div className="flex items-center justify-between">
            <cite className="not-italic font-ui text-sm font-semibold text-primary">
              {votd.ref}
            </cite>
            <Link
              to={`/bible/${votd.bookId}/${votd.chapter}#v${votd.verse}`}
              className="text-xs font-ui text-muted-foreground hover:text-primary inline-flex items-center gap-1"
            >
              Read in context <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </article>

        {/* Continue reading */}
        {last && (
          <Link
            to={`/bible/${last.bookId}/${last.chapter}`}
            className="block bg-background-deep rounded-2xl border border-border/60 p-5 hover:border-primary/40 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-burgundy grid place-items-center shrink-0">
                <BookOpen className="w-4 h-4 text-primary-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs uppercase tracking-widest text-muted-foreground font-ui">
                  Continue Reading
                </div>
                <div className="font-display text-lg text-foreground truncate">
                  {last.bookName} {last.chapter}
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground" />
            </div>
          </Link>
        )}

        {!isPremium && <AdSlot />}

        {/* Premium CTA */}
        {!isPremium && (
          <Link
            to="/pricing"
            className="block relative overflow-hidden rounded-2xl bg-gradient-burgundy p-6 text-primary-foreground shadow-page"
          >
            <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-gradient-gold opacity-30 blur-2xl" />
            <div className="relative">
              <div className="text-xs uppercase tracking-widest text-gold-soft font-ui font-semibold">
                Lumen Premium
              </div>
              <h3 className="font-display text-2xl mt-2">
                Unlimited bookmarks. Vatican daily readings. Ad-free.
              </h3>
              <div className="mt-4 inline-flex items-center gap-2 text-sm font-ui font-medium">
                From $2.99/month <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </Link>
        )}
      </div>
    </div>
  );
};
