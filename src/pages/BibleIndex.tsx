import { Link } from "react-router-dom";
import { BOOK_GROUPS, BOOKS, booksByGroup } from "@/data/books";

export const BibleIndex = () => {
  return (
    <div className="container max-w-3xl mx-auto px-4 py-8 animate-fade-in">
      <header className="text-center mb-8">
        <div className="text-xs uppercase tracking-[0.25em] text-secondary font-ui font-semibold">
          Sacred Scripture
        </div>
        <h1 className="font-display text-4xl mt-2 text-foreground">The Holy Bible</h1>
        <div className="gold-divider mt-4" />
        <p className="text-sm text-muted-foreground mt-3 font-ui">
          {BOOKS.length} books · Old &amp; New Testament
        </p>
      </header>

      <div className="space-y-8">
        {BOOK_GROUPS.map((group) => {
          const books = booksByGroup(group);
          if (!books.length) return null;
          const isOT = books[0].testament === "old";
          return (
            <section key={group}>
              <h2 className="font-display text-xl text-primary mb-3 flex items-center gap-3">
                <span>{group}</span>
                <span className="text-[0.6rem] uppercase tracking-widest text-muted-foreground font-ui">
                  {isOT ? "Old Testament" : "New Testament"}
                </span>
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {books.map((book) => (
                  <Link
                    key={book.id}
                    to={`/bible/${book.id}`}
                    className="group flex items-center justify-between gap-2 px-4 py-3 rounded-lg bg-card border border-border/60 hover:border-primary/40 hover:shadow-soft transition-all"
                  >
                    <span className="font-scripture text-lg text-foreground group-hover:text-primary transition-colors">
                      {book.name}
                    </span>
                    <span className="text-[0.65rem] font-ui text-muted-foreground">
                      {book.chapters}
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
};
