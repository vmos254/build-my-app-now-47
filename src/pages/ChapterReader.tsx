import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, Bookmark as BookmarkIcon, ChevronLeft, ChevronRight, WifiOff } from "lucide-react";
import { getBook } from "@/data/books";
import { fetchChapter, isChapterCached, type ChapterData } from "@/data/chapters";
import { useBookmarks, useContinueReading } from "@/hooks/useBookmarks";
import { usePremium } from "@/hooks/usePremium";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { AdSlot } from "@/components/AdSlot";

const HIGHLIGHT_BG: Record<string, string> = {
  gold: "bg-highlight-gold/60",
  rose: "bg-highlight-rose/60",
  sky: "bg-highlight-sky/60",
  sage: "bg-highlight-sage/60",
};

export const ChapterReader = () => {
  const { bookId = "", chapter = "1" } = useParams();
  const navigate = useNavigate();
  const book = getBook(bookId);
  const chapterNum = Math.max(1, parseInt(chapter, 10) || 1);
  const { isPremium } = usePremium();
  const { bookmarks, find, toggle, atLimit } = useBookmarks(isPremium);
  const { update } = useContinueReading();

  const [data, setData] = useState<ChapterData | null>(null);
  const [loading, setLoading] = useState<boolean>(!isChapterCached(bookId, chapterNum));
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    setError(null);
    const cached = isChapterCached(bookId, chapterNum);
    setLoading(!cached);
    fetchChapter(bookId, chapterNum)
      .then((d) => {
        if (!active) return;
        setData(d);
        setLoading(false);
      })
      .catch((e: Error) => {
        if (!active) return;
        setError(e.message || "Could not load this chapter.");
        setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [bookId, chapterNum]);

  useEffect(() => {
    if (book) {
      update({ bookId: book.id, bookName: book.name, chapter: chapterNum });
    }
  }, [book, chapterNum, update]);

  // Scroll to verse anchor after content loads.
  useEffect(() => {
    if (!data) return;
    const hash = window.location.hash;
    if (hash && hash.startsWith("#v")) {
      requestAnimationFrame(() => {
        const el = document.getElementById(hash.slice(1));
        if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
      });
    }
  }, [data]);

  const verses = useMemo(() => data?.verses ?? [], [data]);

  if (!book) {
    return (
      <div className="container max-w-2xl mx-auto px-4 py-12 text-center">
        <p className="text-muted-foreground">Book not found.</p>
        <Link to="/bible" className="text-primary underline mt-4 inline-block">
          Back to Bible
        </Link>
      </div>
    );
  }

  const handleToggle = (verseNum: number, text: string) => {
    const result = toggle({
      bookId: book.id,
      bookName: book.name,
      chapter: chapterNum,
      verse: verseNum,
      text,
    });
    if (result.ok === false) {
      if (result.reason === "limit") {
        toast.error("Free plan limit reached", {
          description: "Free accounts can save 3 verses. Upgrade to save unlimited.",
          action: { label: "Upgrade", onClick: () => navigate("/pricing") },
        });
      }
      return;
    }
    if (result.created) {
      toast.success(`Saved ${book.name} ${chapterNum}:${verseNum}`);
    }
  };

  const prevDisabled = chapterNum <= 1;
  const nextDisabled = chapterNum >= book.chapters;

  return (
    <div className="animate-fade-in">
      <div className="container max-w-2xl mx-auto px-4 py-6">
        <button
          onClick={() => navigate(`/bible/${book.id}`)}
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary font-ui mb-4"
        >
          <ArrowLeft className="w-4 h-4" /> {book.name}
        </button>

        <header className="text-center my-6">
          <div className="text-xs uppercase tracking-[0.25em] text-secondary font-ui font-semibold">
            Chapter
          </div>
          <h1 className="font-display text-6xl text-primary leading-none mt-1">{chapterNum}</h1>
          <h2 className="font-display text-xl text-foreground mt-2">{book.name}</h2>
          <div className="gold-divider mt-5" />
        </header>

        {loading && <ChapterSkeleton />}

        {error && !loading && (
          <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-5 text-center">
            <WifiOff className="w-5 h-5 mx-auto text-destructive/70" />
            <p className="text-sm font-ui text-foreground mt-2">{error}</p>
            <p className="text-xs text-muted-foreground mt-1">
              Check your connection and try again.
            </p>
            <button
              onClick={() => {
                setLoading(true);
                setError(null);
                fetchChapter(bookId, chapterNum)
                  .then((d) => {
                    setData(d);
                    setLoading(false);
                  })
                  .catch((e: Error) => {
                    setError(e.message);
                    setLoading(false);
                  });
              }}
              className="mt-4 px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-ui"
            >
              Try again
            </button>
          </div>
        )}

        {!loading && !error && verses.length > 0 && (
          <article className="font-scripture text-xl leading-[1.85] text-foreground">
            {verses.map((v, i) => {
              const bm = find(book.id, chapterNum, v.num);
              const colorClass = bm?.color ? HIGHLIGHT_BG[bm.color] : "";
              return (
                <span key={v.num} id={`v${v.num}`}>
                  {i === 0 ? (
                    <span className="drop-cap">
                      <button
                        onClick={() => handleToggle(v.num, v.text)}
                        className={cn("verse-num hover:text-primary cursor-pointer", bm && "text-primary")}
                      >
                        {v.num}
                      </button>
                      <span
                        onClick={() => handleToggle(v.num, v.text)}
                        className={cn("rounded px-0.5 -mx-0.5 cursor-pointer transition-colors", colorClass)}
                      >
                        {v.text}
                      </span>
                    </span>
                  ) : (
                    <>
                      <button
                        onClick={() => handleToggle(v.num, v.text)}
                        className={cn(
                          "verse-num hover:text-primary transition-colors cursor-pointer",
                          bm && "text-primary"
                        )}
                        aria-label={`Bookmark verse ${v.num}`}
                      >
                        {v.num}
                      </button>
                      <span
                        className={cn(
                          "rounded px-0.5 -mx-0.5 transition-colors cursor-pointer",
                          colorClass,
                          bm && !colorClass && "underline decoration-primary/40 decoration-2 underline-offset-4"
                        )}
                        onClick={() => handleToggle(v.num, v.text)}
                      >
                        {v.text}
                      </span>
                    </>
                  )}{" "}
                </span>
              );
            })}
          </article>
        )}

        {!isPremium && !loading && (
          <div className="mt-8">
            <AdSlot />
          </div>
        )}

        {atLimit && !isPremium && (
          <div className="mt-6 rounded-xl bg-gradient-burgundy text-primary-foreground p-4 text-center">
            <p className="font-ui text-sm">
              You've used all {bookmarks.length} free bookmarks.{" "}
              <Link to="/pricing" className="underline font-semibold">
                Upgrade for unlimited
              </Link>
              .
            </p>
          </div>
        )}

        {/* Chapter pager */}
        <div className="flex items-center justify-between mt-10 pt-6 border-t border-border/60">
          <button
            onClick={() => !prevDisabled && navigate(`/bible/${book.id}/${chapterNum - 1}`)}
            disabled={prevDisabled}
            className="inline-flex items-center gap-1.5 text-sm font-ui text-muted-foreground hover:text-primary disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-4 h-4" /> Previous
          </button>
          <Link
            to={`/bible/${book.id}`}
            className="text-xs font-ui text-muted-foreground hover:text-primary"
          >
            All chapters
          </Link>
          <button
            onClick={() => !nextDisabled && navigate(`/bible/${book.id}/${chapterNum + 1}`)}
            disabled={nextDisabled}
            className="inline-flex items-center gap-1.5 text-sm font-ui text-muted-foreground hover:text-primary disabled:opacity-30 disabled:cursor-not-allowed"
          >
            Next <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {!isPremium && (
        <div className="fixed bottom-20 right-4 z-30 bg-card border border-border shadow-page rounded-full px-3 py-1.5 text-xs font-ui text-muted-foreground flex items-center gap-1.5">
          <BookmarkIcon className="w-3 h-3" />
          {bookmarks.length}/3 saved
        </div>
      )}
    </div>
  );
};

const ChapterSkeleton = () => (
  <div className="space-y-3 animate-pulse">
    {[...Array(8)].map((_, i) => (
      <div
        key={i}
        className="h-4 rounded bg-muted/70"
        style={{ width: `${70 + Math.random() * 28}%` }}
      />
    ))}
  </div>
);
