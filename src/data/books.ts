// Catholic Bible — 73 books (Old + New Testament, including Deuterocanonical).
// Source: Douay-Rheims structure (public domain).

export type Testament = "old" | "new";
export type BookGroup =
  | "Pentateuch"
  | "Historical"
  | "Wisdom"
  | "Prophets"
  | "Gospels"
  | "Acts"
  | "Epistles"
  | "Revelation";

export interface BibleBook {
  id: string;          // url-safe id, e.g. "genesis"
  name: string;        // display name
  abbr: string;        // 3-letter abbr
  testament: Testament;
  group: BookGroup;
  chapters: number;
  deuterocanonical?: boolean;
}

export const BOOKS: BibleBook[] = [
  // Pentateuch
  { id: "genesis", name: "Genesis", abbr: "Gen", testament: "old", group: "Pentateuch", chapters: 50 },
  { id: "exodus", name: "Exodus", abbr: "Exo", testament: "old", group: "Pentateuch", chapters: 40 },
  { id: "leviticus", name: "Leviticus", abbr: "Lev", testament: "old", group: "Pentateuch", chapters: 27 },
  { id: "numbers", name: "Numbers", abbr: "Num", testament: "old", group: "Pentateuch", chapters: 36 },
  { id: "deuteronomy", name: "Deuteronomy", abbr: "Deu", testament: "old", group: "Pentateuch", chapters: 34 },

  // Historical
  { id: "joshua", name: "Joshua", abbr: "Jos", testament: "old", group: "Historical", chapters: 24 },
  { id: "judges", name: "Judges", abbr: "Jdg", testament: "old", group: "Historical", chapters: 21 },
  { id: "ruth", name: "Ruth", abbr: "Rut", testament: "old", group: "Historical", chapters: 4 },
  { id: "1-samuel", name: "1 Samuel", abbr: "1Sa", testament: "old", group: "Historical", chapters: 31 },
  { id: "2-samuel", name: "2 Samuel", abbr: "2Sa", testament: "old", group: "Historical", chapters: 24 },
  { id: "1-kings", name: "1 Kings", abbr: "1Ki", testament: "old", group: "Historical", chapters: 22 },
  { id: "2-kings", name: "2 Kings", abbr: "2Ki", testament: "old", group: "Historical", chapters: 25 },
  { id: "1-chronicles", name: "1 Chronicles", abbr: "1Ch", testament: "old", group: "Historical", chapters: 29 },
  { id: "2-chronicles", name: "2 Chronicles", abbr: "2Ch", testament: "old", group: "Historical", chapters: 36 },
  { id: "ezra", name: "Ezra", abbr: "Ezr", testament: "old", group: "Historical", chapters: 10 },
  { id: "nehemiah", name: "Nehemiah", abbr: "Neh", testament: "old", group: "Historical", chapters: 13 },
  { id: "tobit", name: "Tobit", abbr: "Tob", testament: "old", group: "Historical", chapters: 14, deuterocanonical: true },
  { id: "judith", name: "Judith", abbr: "Jdt", testament: "old", group: "Historical", chapters: 16, deuterocanonical: true },
  { id: "esther", name: "Esther", abbr: "Est", testament: "old", group: "Historical", chapters: 16 },
  { id: "1-maccabees", name: "1 Maccabees", abbr: "1Mc", testament: "old", group: "Historical", chapters: 16, deuterocanonical: true },
  { id: "2-maccabees", name: "2 Maccabees", abbr: "2Mc", testament: "old", group: "Historical", chapters: 15, deuterocanonical: true },

  // Wisdom
  { id: "job", name: "Job", abbr: "Job", testament: "old", group: "Wisdom", chapters: 42 },
  { id: "psalms", name: "Psalms", abbr: "Psa", testament: "old", group: "Wisdom", chapters: 150 },
  { id: "proverbs", name: "Proverbs", abbr: "Pro", testament: "old", group: "Wisdom", chapters: 31 },
  { id: "ecclesiastes", name: "Ecclesiastes", abbr: "Ecc", testament: "old", group: "Wisdom", chapters: 12 },
  { id: "song-of-songs", name: "Song of Songs", abbr: "Sng", testament: "old", group: "Wisdom", chapters: 8 },
  { id: "wisdom", name: "Wisdom", abbr: "Wis", testament: "old", group: "Wisdom", chapters: 19, deuterocanonical: true },
  { id: "sirach", name: "Sirach", abbr: "Sir", testament: "old", group: "Wisdom", chapters: 51, deuterocanonical: true },

  // Prophets
  { id: "isaiah", name: "Isaiah", abbr: "Isa", testament: "old", group: "Prophets", chapters: 66 },
  { id: "jeremiah", name: "Jeremiah", abbr: "Jer", testament: "old", group: "Prophets", chapters: 52 },
  { id: "lamentations", name: "Lamentations", abbr: "Lam", testament: "old", group: "Prophets", chapters: 5 },
  { id: "baruch", name: "Baruch", abbr: "Bar", testament: "old", group: "Prophets", chapters: 6, deuterocanonical: true },
  { id: "ezekiel", name: "Ezekiel", abbr: "Eze", testament: "old", group: "Prophets", chapters: 48 },
  { id: "daniel", name: "Daniel", abbr: "Dan", testament: "old", group: "Prophets", chapters: 14 },
  { id: "hosea", name: "Hosea", abbr: "Hos", testament: "old", group: "Prophets", chapters: 14 },
  { id: "joel", name: "Joel", abbr: "Joe", testament: "old", group: "Prophets", chapters: 3 },
  { id: "amos", name: "Amos", abbr: "Amo", testament: "old", group: "Prophets", chapters: 9 },
  { id: "obadiah", name: "Obadiah", abbr: "Oba", testament: "old", group: "Prophets", chapters: 1 },
  { id: "jonah", name: "Jonah", abbr: "Jon", testament: "old", group: "Prophets", chapters: 4 },
  { id: "micah", name: "Micah", abbr: "Mic", testament: "old", group: "Prophets", chapters: 7 },
  { id: "nahum", name: "Nahum", abbr: "Nah", testament: "old", group: "Prophets", chapters: 3 },
  { id: "habakkuk", name: "Habakkuk", abbr: "Hab", testament: "old", group: "Prophets", chapters: 3 },
  { id: "zephaniah", name: "Zephaniah", abbr: "Zep", testament: "old", group: "Prophets", chapters: 3 },
  { id: "haggai", name: "Haggai", abbr: "Hag", testament: "old", group: "Prophets", chapters: 2 },
  { id: "zechariah", name: "Zechariah", abbr: "Zec", testament: "old", group: "Prophets", chapters: 14 },
  { id: "malachi", name: "Malachi", abbr: "Mal", testament: "old", group: "Prophets", chapters: 4 },

  // Gospels
  { id: "matthew", name: "Matthew", abbr: "Mat", testament: "new", group: "Gospels", chapters: 28 },
  { id: "mark", name: "Mark", abbr: "Mar", testament: "new", group: "Gospels", chapters: 16 },
  { id: "luke", name: "Luke", abbr: "Luk", testament: "new", group: "Gospels", chapters: 24 },
  { id: "john", name: "John", abbr: "Joh", testament: "new", group: "Gospels", chapters: 21 },

  // Acts
  { id: "acts", name: "Acts", abbr: "Act", testament: "new", group: "Acts", chapters: 28 },

  // Epistles
  { id: "romans", name: "Romans", abbr: "Rom", testament: "new", group: "Epistles", chapters: 16 },
  { id: "1-corinthians", name: "1 Corinthians", abbr: "1Co", testament: "new", group: "Epistles", chapters: 16 },
  { id: "2-corinthians", name: "2 Corinthians", abbr: "2Co", testament: "new", group: "Epistles", chapters: 13 },
  { id: "galatians", name: "Galatians", abbr: "Gal", testament: "new", group: "Epistles", chapters: 6 },
  { id: "ephesians", name: "Ephesians", abbr: "Eph", testament: "new", group: "Epistles", chapters: 6 },
  { id: "philippians", name: "Philippians", abbr: "Php", testament: "new", group: "Epistles", chapters: 4 },
  { id: "colossians", name: "Colossians", abbr: "Col", testament: "new", group: "Epistles", chapters: 4 },
  { id: "1-thessalonians", name: "1 Thessalonians", abbr: "1Th", testament: "new", group: "Epistles", chapters: 5 },
  { id: "2-thessalonians", name: "2 Thessalonians", abbr: "2Th", testament: "new", group: "Epistles", chapters: 3 },
  { id: "1-timothy", name: "1 Timothy", abbr: "1Ti", testament: "new", group: "Epistles", chapters: 6 },
  { id: "2-timothy", name: "2 Timothy", abbr: "2Ti", testament: "new", group: "Epistles", chapters: 4 },
  { id: "titus", name: "Titus", abbr: "Tit", testament: "new", group: "Epistles", chapters: 3 },
  { id: "philemon", name: "Philemon", abbr: "Phm", testament: "new", group: "Epistles", chapters: 1 },
  { id: "hebrews", name: "Hebrews", abbr: "Heb", testament: "new", group: "Epistles", chapters: 13 },
  { id: "james", name: "James", abbr: "Jas", testament: "new", group: "Epistles", chapters: 5 },
  { id: "1-peter", name: "1 Peter", abbr: "1Pe", testament: "new", group: "Epistles", chapters: 5 },
  { id: "2-peter", name: "2 Peter", abbr: "2Pe", testament: "new", group: "Epistles", chapters: 3 },
  { id: "1-john", name: "1 John", abbr: "1Jn", testament: "new", group: "Epistles", chapters: 5 },
  { id: "2-john", name: "2 John", abbr: "2Jn", testament: "new", group: "Epistles", chapters: 1 },
  { id: "3-john", name: "3 John", abbr: "3Jn", testament: "new", group: "Epistles", chapters: 1 },
  { id: "jude", name: "Jude", abbr: "Jud", testament: "new", group: "Epistles", chapters: 1 },

  // Revelation
  { id: "revelation", name: "Revelation", abbr: "Rev", testament: "new", group: "Revelation", chapters: 22 },
];

export const BOOK_GROUPS: BookGroup[] = [
  "Pentateuch", "Historical", "Wisdom", "Prophets",
  "Gospels", "Acts", "Epistles", "Revelation",
];

export function getBook(id: string): BibleBook | undefined {
  return BOOKS.find((b) => b.id === id);
}

export function booksByGroup(group: BookGroup): BibleBook[] {
  return BOOKS.filter((b) => b.group === group);
}
