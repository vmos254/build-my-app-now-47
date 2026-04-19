import { useEffect, useState, useCallback } from "react";

const BOOKMARKS_KEY = "lumen.bookmarks.v1";
const READING_KEY = "lumen.continueReading.v1";
export const FREE_BOOKMARK_LIMIT = 3;

export type HighlightColor = "gold" | "rose" | "sky" | "sage" | null;

export interface Bookmark {
  id: string;          // `${bookId}-${chapter}-${verse}`
  bookId: string;
  bookName: string;
  chapter: number;
  verse: number;
  text: string;
  color: HighlightColor;
  createdAt: number;
}

export interface ContinueReading {
  bookId: string;
  bookName: string;
  chapter: number;
  updatedAt: number;
}

function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write<T>(key: string, value: T) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* ignore quota errors */
  }
}

export function useBookmarks(isPremium = false) {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>(() =>
    read<Bookmark[]>(BOOKMARKS_KEY, [])
  );

  useEffect(() => {
    write(BOOKMARKS_KEY, bookmarks);
  }, [bookmarks]);

  const limit = isPremium ? Infinity : FREE_BOOKMARK_LIMIT;
  const atLimit = bookmarks.length >= limit;

  const find = useCallback(
    (bookId: string, chapter: number, verse: number) =>
      bookmarks.find(
        (b) => b.bookId === bookId && b.chapter === chapter && b.verse === verse
      ),
    [bookmarks]
  );

  const toggle = useCallback(
    (data: Omit<Bookmark, "id" | "createdAt" | "color"> & { color?: HighlightColor }):
      | { ok: true; created: boolean }
      | { ok: false; reason: "limit" } => {
      const id = `${data.bookId}-${data.chapter}-${data.verse}`;
      const existing = bookmarks.find((b) => b.id === id);
      if (existing) {
        setBookmarks((prev) => prev.filter((b) => b.id !== id));
        return { ok: true, created: false };
      }
      if (bookmarks.length >= limit) {
        return { ok: false, reason: "limit" };
      }
      const next: Bookmark = {
        id,
        bookId: data.bookId,
        bookName: data.bookName,
        chapter: data.chapter,
        verse: data.verse,
        text: data.text,
        color: data.color ?? "gold",
        createdAt: Date.now(),
      };
      setBookmarks((prev) => [next, ...prev]);
      return { ok: true, created: true };
    },
    [bookmarks, limit]
  );

  const setColor = useCallback((id: string, color: HighlightColor) => {
    setBookmarks((prev) =>
      prev.map((b) => (b.id === id ? { ...b, color } : b))
    );
  }, []);

  const remove = useCallback((id: string) => {
    setBookmarks((prev) => prev.filter((b) => b.id !== id));
  }, []);

  return { bookmarks, find, toggle, setColor, remove, atLimit, limit };
}

export function useContinueReading() {
  const [last, setLast] = useState<ContinueReading | null>(() =>
    read<ContinueReading | null>(READING_KEY, null)
  );

  const update = useCallback((data: Omit<ContinueReading, "updatedAt">) => {
    const next = { ...data, updatedAt: Date.now() };
    setLast(next);
    write(READING_KEY, next);
  }, []);

  return { last, update };
}
