// Live Bible loading from bolls.life — Contemporary English Version w/ Apocrypha (CEVD).
// Caches each chapter in localStorage indefinitely after first fetch.

import { getBook, TRANSLATION_CODE } from "./books";

export interface Verse {
  num: number;
  text: string;
}

export interface ChapterData {
  bookId: string;
  chapter: number;
  verses: Verse[];
}

const CACHE_PREFIX = `lumen.${TRANSLATION_CODE}.`;
const CACHE_VERSION = "v1";

function cacheKey(bookId: string, chapter: number) {
  return `${CACHE_PREFIX}${CACHE_VERSION}.${bookId}.${chapter}`;
}

function readCache(bookId: string, chapter: number): Verse[] | null {
  try {
    const raw = localStorage.getItem(cacheKey(bookId, chapter));
    return raw ? (JSON.parse(raw) as Verse[]) : null;
  } catch {
    return null;
  }
}

function writeCache(bookId: string, chapter: number, verses: Verse[]) {
  try {
    localStorage.setItem(cacheKey(bookId, chapter), JSON.stringify(verses));
  } catch {
    // Quota exceeded — silently drop. Cached chapters are nice-to-have, not required.
  }
}

/** Strip CEVD inline HTML (br, sup footnote markers, etc.) for clean reading. */
function cleanCEVD(text: string): string {
  return text
    .replace(/<br\s*\/?\s*>/gi, " ")
    .replace(/<sup>.*?<\/sup>/gi, "")
    .replace(/<i>(.*?)<\/i>/gi, "$1")
    .replace(/<b>(.*?)<\/b>/gi, "$1")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export async function fetchChapter(
  bookId: string,
  chapter: number
): Promise<ChapterData> {
  const book = getBook(bookId);
  if (!book) {
    return { bookId, chapter, verses: [] };
  }

  const cached = readCache(bookId, chapter);
  if (cached && cached.length > 0) {
    return { bookId, chapter, verses: cached };
  }

  const url = `https://bolls.life/get-text/${TRANSLATION_CODE}/${book.bollsId}/${chapter}/`;
  const res = await fetch(url, { method: "GET" });
  if (!res.ok) {
    throw new Error(`Failed to load ${book.name} ${chapter} (${res.status})`);
  }
  const json = (await res.json()) as Array<{ verse: number; text: string }>;
  const verses: Verse[] = json
    .filter((v) => v && typeof v.verse === "number" && typeof v.text === "string")
    .map((v) => ({ num: v.verse, text: cleanCEVD(v.text) }));

  if (verses.length > 0) {
    writeCache(bookId, chapter, verses);
  }
  return { bookId, chapter, verses };
}

export function isChapterCached(bookId: string, chapter: number): boolean {
  return readCache(bookId, chapter) !== null;
}

/** Iterate all currently-cached chapters (used by search). */
export function getAllCachedChapters(): ChapterData[] {
  const out: ChapterData[] = [];
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (!key || !key.startsWith(`${CACHE_PREFIX}${CACHE_VERSION}.`)) continue;
      const parts = key.substring(`${CACHE_PREFIX}${CACHE_VERSION}.`.length).split(".");
      if (parts.length < 2) continue;
      const chapter = parseInt(parts[parts.length - 1], 10);
      const bookId = parts.slice(0, -1).join(".");
      const raw = localStorage.getItem(key);
      if (!raw) continue;
      try {
        const verses = JSON.parse(raw) as Verse[];
        out.push({ bookId, chapter, verses });
      } catch {
        /* skip */
      }
    }
  } catch {
    /* ignore */
  }
  return out;
}

// Curated verse-of-the-day pool (always available — no fetch needed).
export const VERSES_OF_THE_DAY = [
  { ref: "John 1:5", text: "The light keeps shining in the dark, and darkness has never put it out.", bookId: "john", chapter: 1, verse: 5 },
  { ref: "Psalm 23:1", text: "You, Lord, are my shepherd. I will never be in need.", bookId: "psalms", chapter: 23, verse: 1 },
  { ref: "Matthew 5:9", text: "God blesses those people who make peace. They will be called his children!", bookId: "matthew", chapter: 5, verse: 9 },
  { ref: "Genesis 1:3", text: "God said, “I command light to shine!” And light started shining.", bookId: "genesis", chapter: 1, verse: 3 },
  { ref: "Matthew 5:8", text: "God blesses those people whose hearts are pure. They will see him!", bookId: "matthew", chapter: 5, verse: 8 },
  { ref: "John 1:14", text: "The Word became a human being and lived here with us.", bookId: "john", chapter: 1, verse: 14 },
  { ref: "Philippians 4:13", text: "Christ gives me the strength to face anything.", bookId: "philippians", chapter: 4, verse: 13 },
  { ref: "Psalm 46:10", text: "Calm down, and learn that I am God!", bookId: "psalms", chapter: 46, verse: 10 },
  { ref: "Isaiah 41:10", text: "Don’t be afraid. I am with you. Don’t tremble with fear. I am your God.", bookId: "isaiah", chapter: 41, verse: 10 },
  { ref: "Romans 8:28", text: "We know that God is always at work for the good of everyone who loves him.", bookId: "romans", chapter: 8, verse: 28 },
];

export function verseOfTheDay() {
  const dayIndex = Math.floor(Date.now() / (1000 * 60 * 60 * 24));
  return VERSES_OF_THE_DAY[dayIndex % VERSES_OF_THE_DAY.length];
}
