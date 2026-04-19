import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useMemo } from "react";
import { ArrowLeft, Bookmark as BookmarkIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { getBook } from "@/data/books";
import { getChapter, isChapterLoaded } from "@/data/chapters";
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

  const data = useMemo(() => getChapter(bookId, chapterNum), [bookId, chapterNum]);
  const loaded = isChapterLoaded(bookId, chapterNum);

  useEffect(() => {
    if (book) {
      update({ bookId: book.id, bookName: book.name, chapter: chapterNum });
    }
  }, [book, chapterNum, update]);

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
    if (!result.ok) {
      if (result.reason === "limit") {
        toast.error("Free plan limit reached", {
          description: "Free accounts can save 3 verses. Upgrade to save unlimited.",
          action: { label: "Upgrade", onClick: () => navigate("/pricing") },
        });
      }
    } else if (result.created) {
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

        {!loaded && (
          <div className="rounded-xl border border-dashed border-border/80 bg-background-deep/60 p-4 mb-6 text-center">
            <p className="text-xs font-ui text-muted-foreground">
              Live text loading is being added — showing a sample for now.
            </p>
          </div>
        )}

        <article className="font-scripture text-xl leading-[1.85] text-foreground">
          {data.verses.map((v, i) => {
            const bm = find(book.id, chapterNum, v.num);
            const colorClass = bm?.color ? HIGHLIGHT_BG[bm.color] : "";
            return (
              <span key={v.num} id={`v${v.num}`}>
                {i === 0 && loaded ? (
                  <span className="drop-cap">
                    <span className="verse-num">{v.num}</span>
                    <span className={cn("rounded px-0.5 -mx-0.5 transition-colors", colorClass)}>
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

        {!isPremium && (
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

      {/* Floating bookmarks counter for free users */}
      {!isPremium && (
        <div className="fixed bottom-20 right-4 z-30 bg-card border border-border shadow-page rounded-full px-3 py-1.5 text-xs font-ui text-muted-foreground flex items-center gap-1.5">
          <BookmarkIcon className="w-3 h-3" />
          {bookmarks.length}/3 saved
        </div>
      )}
    </div>
  );
};
