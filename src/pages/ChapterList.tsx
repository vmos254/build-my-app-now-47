import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { getBook } from "@/data/books";

export const ChapterList = () => {
  const { bookId = "" } = useParams();
  const book = getBook(bookId);
  const navigate = useNavigate();

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

  return (
    <div className="container max-w-3xl mx-auto px-4 py-8 animate-fade-in">
      <button
        onClick={() => navigate("/bible")}
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary font-ui mb-6"
      >
        <ArrowLeft className="w-4 h-4" /> All Books
      </button>

      <header className="text-center mb-8">
        <div className="text-xs uppercase tracking-[0.25em] text-secondary font-ui font-semibold">
          {book.testament === "old" ? "Old Testament" : "New Testament"}
          {book.deuterocanonical && " · Deuterocanonical"}
        </div>
        <h1 className="font-display text-5xl mt-2 text-foreground">{book.name}</h1>
        <div className="gold-divider mt-5" />
        <p className="text-sm text-muted-foreground mt-3 font-ui">
          {book.chapters} {book.chapters === 1 ? "chapter" : "chapters"}
        </p>
      </header>

      <div className="grid grid-cols-5 sm:grid-cols-7 md:grid-cols-10 gap-2">
        {Array.from({ length: book.chapters }, (_, i) => i + 1).map((n) => (
          <Link
            key={n}
            to={`/bible/${book.id}/${n}`}
            className="aspect-square grid place-items-center rounded-lg bg-card border border-border/60 hover:border-primary hover:bg-primary hover:text-primary-foreground transition-all font-display text-lg text-foreground"
          >
            {n}
          </Link>
        ))}
      </div>
    </div>
  );
};
