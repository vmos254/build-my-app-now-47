import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Search as SearchIcon } from "lucide-react";
import { BOOKS } from "@/data/books";
import { VERSES_OF_THE_DAY } from "@/data/chapters";

// Build a tiny searchable index from chapters we have loaded + the verse-of-day pool.
// More thorough search will plug in once full chapter text loads on demand.
import { getChapter } from "@/data/chapters";

const SAMPLE_REFS: Array<{ bookId: string; chapter: number }> = [
  { bookId: "genesis", chapter: 1 },
  { bookId: "psalms", chapter: 23 },
  { bookId: "john", chapter: 1 },
  { bookId: "matthew", chapter: 5 },
];

export const SearchPage = () => {
  const [q, setQ] = useState("");

  const results = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (query.length < 2) return [];
    const matches: Array<{ bookId: string; bookName: string; chapter: number; verse: number; text: string }> = [];
    for (const ref of SAMPLE_REFS) {
      const book = BOOKS.find((b) => b.id === ref.bookId);
      if (!book) continue;
      const data = getChapter(ref.bookId, ref.chapter);
      for (const v of data.verses) {
        if (v.text.toLowerCase().includes(query)) {
          matches.push({
            bookId: book.id,
            bookName: book.name,
            chapter: ref.chapter,
            verse: v.num,
            text: v.text,
          });
        }
      }
    }
    // Also fold in our verse-of-day sample pool
    for (const v of VERSES_OF_THE_DAY) {
      if (v.text.toLowerCase().includes(query) && !matches.find((m) => m.bookId === v.bookId && m.chapter === v.chapter && m.verse === v.verse)) {
        const book = BOOKS.find((b) => b.id === v.bookId);
        if (book) {
          matches.push({
            bookId: book.id,
            bookName: book.name,
            chapter: v.chapter,
            verse: v.verse,
            text: v.text,
          });
        }
      }
    }
    return matches.slice(0, 50);
  }, [q]);

  return (
    <div className="container max-w-2xl mx-auto px-4 py-8 animate-fade-in">
      <header className="text-center mb-6">
        <h1 className="font-display text-4xl text-foreground">Search Scripture</h1>
        <div className="gold-divider mt-3" />
      </header>

      <div className="relative">
        <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          autoFocus
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search verses, e.g. 'light' or 'blessed'"
          className="w-full pl-11 pr-4 py-3 rounded-full bg-card border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none font-ui text-sm"
        />
      </div>

      <p className="text-xs text-muted-foreground text-center mt-3 font-ui">
        Searching loaded chapters. Full Bible search activates with live text loading.
      </p>

      <div className="mt-6 space-y-2">
        {q.trim().length >= 2 && results.length === 0 && (
          <p className="text-center text-muted-foreground py-8 font-ui text-sm">
            No matches. Try another word.
          </p>
        )}
        {results.map((r) => (
          <Link
            key={`${r.bookId}-${r.chapter}-${r.verse}`}
            to={`/bible/${r.bookId}/${r.chapter}#v${r.verse}`}
            className="block p-4 rounded-xl bg-card border border-border/60 hover:border-primary/40 hover:shadow-soft transition-all"
          >
            <div className="text-xs font-ui font-semibold text-primary uppercase tracking-wider">
              {r.bookName} {r.chapter}:{r.verse}
            </div>
            <p className="font-scripture text-lg text-foreground mt-1 leading-snug">
              {highlight(r.text, q)}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

function highlight(text: string, q: string) {
  const idx = text.toLowerCase().indexOf(q.toLowerCase());
  if (idx < 0 || q.length < 2) return text;
  return (
    <>
      {text.slice(0, idx)}
      <mark className="bg-highlight-gold/70 text-foreground px-0.5 rounded">
        {text.slice(idx, idx + q.length)}
      </mark>
      {text.slice(idx + q.length)}
    </>
  );
}
