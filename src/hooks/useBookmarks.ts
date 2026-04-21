import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

const READING_KEY = "lumen.continueReading.v1";
const LOCAL_BOOKMARKS_KEY = "lumen.bookmarks.v1";
const MIGRATED_KEY = "lumen.bookmarks.migrated.v1";
export const FREE_BOOKMARK_LIMIT = 3;

export type HighlightColor = "gold" | "rose" | "sky" | "sage" | null;

export interface Bookmark {
  id: string;            // db row id (uuid) when authed; otherwise composite local id
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
    /* ignore */
  }
}

interface DbRow {
  id: string;
  book_id: string;
  book_name: string;
  chapter: number;
  verse: number;
  text: string;
  color: string;
  created_at: string;
}

const rowToBookmark = (r: DbRow): Bookmark => ({
  id: r.id,
  bookId: r.book_id,
  bookName: r.book_name,
  chapter: r.chapter,
  verse: r.verse,
  text: r.text,
  color: (r.color as HighlightColor) ?? "gold",
  createdAt: new Date(r.created_at).getTime(),
});

/**
 * Bookmarks hook.
 * - Signed-in users: stored in Lovable Cloud, synced across devices, unlimited if premium.
 * - Anonymous users: stored in localStorage (capped at FREE_BOOKMARK_LIMIT).
 * - On first sign-in, any local bookmarks are migrated to the cloud.
 */
export function useBookmarks(isPremium = false) {
  const { user } = useAuth();
  const [bookmarks, setBookmarks] = useState<Bookmark[]>(() =>
    read<Bookmark[]>(LOCAL_BOOKMARKS_KEY, [])
  );
  const [loading, setLoading] = useState<boolean>(false);

  // Persist anonymous bookmarks locally
  useEffect(() => {
    if (!user) write(LOCAL_BOOKMARKS_KEY, bookmarks);
  }, [bookmarks, user]);

  // Load bookmarks from cloud when signed in, and migrate local ones once
  useEffect(() => {
    let cancelled = false;
    if (!user) return;

    (async () => {
      setLoading(true);

      // One-time migration of localStorage bookmarks to the cloud
      const migratedFor = localStorage.getItem(MIGRATED_KEY);
      if (migratedFor !== user.id) {
        const local = read<Bookmark[]>(LOCAL_BOOKMARKS_KEY, []);
        if (local.length > 0) {
          const rows = local.map((b) => ({
            user_id: user.id,
            book_id: b.bookId,
            book_name: b.bookName,
            chapter: b.chapter,
            verse: b.verse,
            text: b.text,
            color: b.color ?? "gold",
          }));
          await supabase
            .from("bookmarks")
            .upsert(rows, { onConflict: "user_id,book_id,chapter,verse" });
        }
        localStorage.setItem(MIGRATED_KEY, user.id);
        try {
          localStorage.removeItem(LOCAL_BOOKMARKS_KEY);
        } catch {
          /* ignore */
        }
      }

      const { data, error } = await supabase
        .from("bookmarks")
        .select("*")
        .order("created_at", { ascending: false });

      if (!cancelled) {
        if (!error && data) {
          setBookmarks((data as DbRow[]).map(rowToBookmark));
        }
        setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [user]);

  const limit = user && isPremium ? Infinity : FREE_BOOKMARK_LIMIT;
  const atLimit = bookmarks.length >= limit;

  const find = useCallback(
    (bookId: string, chapter: number, verse: number) =>
      bookmarks.find(
        (b) => b.bookId === bookId && b.chapter === chapter && b.verse === verse
      ),
    [bookmarks]
  );

  const toggle = useCallback(
    (
      data: Omit<Bookmark, "id" | "createdAt" | "color"> & { color?: HighlightColor }
    ): Promise<{ ok: true; created: boolean } | { ok: false; reason: "limit" | "auth" }> => {
      return (async () => {
        const existing = bookmarks.find(
          (b) =>
            b.bookId === data.bookId &&
            b.chapter === data.chapter &&
            b.verse === data.verse
        );

        // Remove
        if (existing) {
          if (user) {
            await supabase.from("bookmarks").delete().eq("id", existing.id);
          }
          setBookmarks((prev) => prev.filter((b) => b.id !== existing.id));
          return { ok: true as const, created: false };
        }

        // Add: enforce free-tier limit
        if (bookmarks.length >= limit) {
          return { ok: false as const, reason: "limit" as const };
        }

        const color = data.color ?? "gold";

        if (user) {
          const { data: row, error } = await supabase
            .from("bookmarks")
            .insert({
              user_id: user.id,
              book_id: data.bookId,
              book_name: data.bookName,
              chapter: data.chapter,
              verse: data.verse,
              text: data.text,
              color,
            })
            .select()
            .single();
          if (error || !row) return { ok: false as const, reason: "auth" as const };
          setBookmarks((prev) => [rowToBookmark(row as DbRow), ...prev]);
          return { ok: true as const, created: true };
        }

        // Anonymous local-only
        const localId = `${data.bookId}-${data.chapter}-${data.verse}`;
        const next: Bookmark = {
          id: localId,
          bookId: data.bookId,
          bookName: data.bookName,
          chapter: data.chapter,
          verse: data.verse,
          text: data.text,
          color,
          createdAt: Date.now(),
        };
        setBookmarks((prev) => [next, ...prev]);
        return { ok: true as const, created: true };
      })();
    },
    [bookmarks, limit, user]
  );

  const setColor = useCallback(
    async (id: string, color: HighlightColor) => {
      setBookmarks((prev) => prev.map((b) => (b.id === id ? { ...b, color } : b)));
      if (user) {
        await supabase.from("bookmarks").update({ color: color ?? "gold" }).eq("id", id);
      }
    },
    [user]
  );

  const remove = useCallback(
    async (id: string) => {
      setBookmarks((prev) => prev.filter((b) => b.id !== id));
      if (user) {
        await supabase.from("bookmarks").delete().eq("id", id);
      }
    },
    [user]
  );

  return { bookmarks, find, toggle, setColor, remove, atLimit, limit, loading };
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
