// Catholic Bible — books matching the WEB (World English Bible, public domain)
// catalog on bolls.life, including deuterocanonical books.
// Each book has a `bollsId` mapping to the bolls.life numeric book ID for live text fetching.

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
  abbr: string;
  testament: Testament;
  group: BookGroup;
  chapters: number;
  bollsId: number;     // bolls.life book id for fetching
  deuterocanonical?: boolean;
}

export const BOOKS: BibleBook[] = [
  // Pentateuch
  { id: "genesis", name: "Genesis", abbr: "Gen", testament: "old", group: "Pentateuch", chapters: 50, bollsId: 1 },
  { id: "exodus", name: "Exodus", abbr: "Exo", testament: "old", group: "Pentateuch", chapters: 40, bollsId: 2 },
  { id: "leviticus", name: "Leviticus", abbr: "Lev", testament: "old", group: "Pentateuch", chapters: 27, bollsId: 3 },
  { id: "numbers", name: "Numbers", abbr: "Num", testament: "old", group: "Pentateuch", chapters: 36, bollsId: 4 },
  { id: "deuteronomy", name: "Deuteronomy", abbr: "Deu", testament: "old", group: "Pentateuch", chapters: 34, bollsId: 5 },

  // Historical
  { id: "joshua", name: "Joshua", abbr: "Jos", testament: "old", group: "Historical", chapters: 24, bollsId: 6 },
  { id: "judges", name: "Judges", abbr: "Jdg", testament: "old", group: "Historical", chapters: 21, bollsId: 7 },
  { id: "ruth", name: "Ruth", abbr: "Rut", testament: "old", group: "Historical", chapters: 4, bollsId: 8 },
  { id: "1-samuel", name: "1 Samuel", abbr: "1Sa", testament: "old", group: "Historical", chapters: 31, bollsId: 9 },
  { id: "2-samuel", name: "2 Samuel", abbr: "2Sa", testament: "old", group: "Historical", chapters: 24, bollsId: 10 },
  { id: "1-kings", name: "1 Kings", abbr: "1Ki", testament: "old", group: "Historical", chapters: 22, bollsId: 11 },
  { id: "2-kings", name: "2 Kings", abbr: "2Ki", testament: "old", group: "Historical", chapters: 25, bollsId: 12 },
  { id: "1-chronicles", name: "1 Chronicles", abbr: "1Ch", testament: "old", group: "Historical", chapters: 29, bollsId: 13 },
  { id: "2-chronicles", name: "2 Chronicles", abbr: "2Ch", testament: "old", group: "Historical", chapters: 36, bollsId: 14 },
  { id: "ezra", name: "Ezra", abbr: "Ezr", testament: "old", group: "Historical", chapters: 10, bollsId: 15 },
  { id: "nehemiah", name: "Nehemiah", abbr: "Neh", testament: "old", group: "Historical", chapters: 13, bollsId: 16 },
  { id: "tobit", name: "Tobit", abbr: "Tob", testament: "old", group: "Historical", chapters: 14, bollsId: 68, deuterocanonical: true },
  { id: "judith", name: "Judith", abbr: "Jdt", testament: "old", group: "Historical", chapters: 16, bollsId: 69, deuterocanonical: true },
  { id: "esther", name: "Esther", abbr: "Est", testament: "old", group: "Historical", chapters: 10, bollsId: 17 },
  { id: "esther-greek", name: "Esther (Greek)", abbr: "EsG", testament: "old", group: "Historical", chapters: 10, bollsId: 81, deuterocanonical: true },
  { id: "1-maccabees", name: "1 Maccabees", abbr: "1Mc", testament: "old", group: "Historical", chapters: 16, bollsId: 74, deuterocanonical: true },
  { id: "2-maccabees", name: "2 Maccabees", abbr: "2Mc", testament: "old", group: "Historical", chapters: 15, bollsId: 75, deuterocanonical: true },

  // Wisdom
  { id: "job", name: "Job", abbr: "Job", testament: "old", group: "Wisdom", chapters: 42, bollsId: 18 },
  { id: "psalms", name: "Psalms", abbr: "Psa", testament: "old", group: "Wisdom", chapters: 150, bollsId: 19 },
  { id: "proverbs", name: "Proverbs", abbr: "Pro", testament: "old", group: "Wisdom", chapters: 31, bollsId: 20 },
  { id: "ecclesiastes", name: "Ecclesiastes", abbr: "Ecc", testament: "old", group: "Wisdom", chapters: 12, bollsId: 21 },
  { id: "song-of-songs", name: "Song of Songs", abbr: "Sng", testament: "old", group: "Wisdom", chapters: 8, bollsId: 22 },
  { id: "wisdom", name: "Wisdom", abbr: "Wis", testament: "old", group: "Wisdom", chapters: 19, bollsId: 70, deuterocanonical: true },
  { id: "sirach", name: "Sirach", abbr: "Sir", testament: "old", group: "Wisdom", chapters: 51, bollsId: 71, deuterocanonical: true },

  // Prophets
  { id: "isaiah", name: "Isaiah", abbr: "Isa", testament: "old", group: "Prophets", chapters: 66, bollsId: 23 },
  { id: "jeremiah", name: "Jeremiah", abbr: "Jer", testament: "old", group: "Prophets", chapters: 52, bollsId: 24 },
  { id: "lamentations", name: "Lamentations", abbr: "Lam", testament: "old", group: "Prophets", chapters: 5, bollsId: 25 },
  { id: "baruch", name: "Baruch", abbr: "Bar", testament: "old", group: "Prophets", chapters: 5, bollsId: 73, deuterocanonical: true },
  { id: "letter-of-jeremiah", name: "Letter of Jeremiah", abbr: "LJe", testament: "old", group: "Prophets", chapters: 1, bollsId: 72, deuterocanonical: true },
  { id: "ezekiel", name: "Ezekiel", abbr: "Eze", testament: "old", group: "Prophets", chapters: 48, bollsId: 26 },
  { id: "daniel", name: "Daniel", abbr: "Dan", testament: "old", group: "Prophets", chapters: 12, bollsId: 27 },
  { id: "prayer-of-azariah", name: "Prayer of Azariah", abbr: "PrA", testament: "old", group: "Prophets", chapters: 1, bollsId: 82, deuterocanonical: true },
  { id: "susanna", name: "Susanna", abbr: "Sus", testament: "old", group: "Prophets", chapters: 1, bollsId: 78, deuterocanonical: true },
  { id: "bel-and-the-dragon", name: "Bel and the Dragon", abbr: "Bel", testament: "old", group: "Prophets", chapters: 1, bollsId: 79, deuterocanonical: true },
  { id: "hosea", name: "Hosea", abbr: "Hos", testament: "old", group: "Prophets", chapters: 14, bollsId: 28 },
  { id: "joel", name: "Joel", abbr: "Joe", testament: "old", group: "Prophets", chapters: 3, bollsId: 29 },
  { id: "amos", name: "Amos", abbr: "Amo", testament: "old", group: "Prophets", chapters: 9, bollsId: 30 },
  { id: "obadiah", name: "Obadiah", abbr: "Oba", testament: "old", group: "Prophets", chapters: 1, bollsId: 31 },
  { id: "jonah", name: "Jonah", abbr: "Jon", testament: "old", group: "Prophets", chapters: 4, bollsId: 32 },
  { id: "micah", name: "Micah", abbr: "Mic", testament: "old", group: "Prophets", chapters: 7, bollsId: 33 },
  { id: "nahum", name: "Nahum", abbr: "Nah", testament: "old", group: "Prophets", chapters: 3, bollsId: 34 },
  { id: "habakkuk", name: "Habakkuk", abbr: "Hab", testament: "old", group: "Prophets", chapters: 3, bollsId: 35 },
  { id: "zephaniah", name: "Zephaniah", abbr: "Zep", testament: "old", group: "Prophets", chapters: 3, bollsId: 36 },
  { id: "haggai", name: "Haggai", abbr: "Hag", testament: "old", group: "Prophets", chapters: 2, bollsId: 37 },
  { id: "zechariah", name: "Zechariah", abbr: "Zec", testament: "old", group: "Prophets", chapters: 14, bollsId: 38 },
  { id: "malachi", name: "Malachi", abbr: "Mal", testament: "old", group: "Prophets", chapters: 4, bollsId: 39 },

  // Gospels
  { id: "matthew", name: "Matthew", abbr: "Mat", testament: "new", group: "Gospels", chapters: 28, bollsId: 40 },
  { id: "mark", name: "Mark", abbr: "Mar", testament: "new", group: "Gospels", chapters: 16, bollsId: 41 },
  { id: "luke", name: "Luke", abbr: "Luk", testament: "new", group: "Gospels", chapters: 24, bollsId: 42 },
  { id: "john", name: "John", abbr: "Joh", testament: "new", group: "Gospels", chapters: 21, bollsId: 43 },

  // Acts
  { id: "acts", name: "Acts", abbr: "Act", testament: "new", group: "Acts", chapters: 28, bollsId: 44 },

  // Epistles
  { id: "romans", name: "Romans", abbr: "Rom", testament: "new", group: "Epistles", chapters: 16, bollsId: 45 },
  { id: "1-corinthians", name: "1 Corinthians", abbr: "1Co", testament: "new", group: "Epistles", chapters: 16, bollsId: 46 },
  { id: "2-corinthians", name: "2 Corinthians", abbr: "2Co", testament: "new", group: "Epistles", chapters: 13, bollsId: 47 },
  { id: "galatians", name: "Galatians", abbr: "Gal", testament: "new", group: "Epistles", chapters: 6, bollsId: 48 },
  { id: "ephesians", name: "Ephesians", abbr: "Eph", testament: "new", group: "Epistles", chapters: 6, bollsId: 49 },
  { id: "philippians", name: "Philippians", abbr: "Php", testament: "new", group: "Epistles", chapters: 4, bollsId: 50 },
  { id: "colossians", name: "Colossians", abbr: "Col", testament: "new", group: "Epistles", chapters: 4, bollsId: 51 },
  { id: "1-thessalonians", name: "1 Thessalonians", abbr: "1Th", testament: "new", group: "Epistles", chapters: 5, bollsId: 52 },
  { id: "2-thessalonians", name: "2 Thessalonians", abbr: "2Th", testament: "new", group: "Epistles", chapters: 3, bollsId: 53 },
  { id: "1-timothy", name: "1 Timothy", abbr: "1Ti", testament: "new", group: "Epistles", chapters: 6, bollsId: 54 },
  { id: "2-timothy", name: "2 Timothy", abbr: "2Ti", testament: "new", group: "Epistles", chapters: 4, bollsId: 55 },
  { id: "titus", name: "Titus", abbr: "Tit", testament: "new", group: "Epistles", chapters: 3, bollsId: 56 },
  { id: "philemon", name: "Philemon", abbr: "Phm", testament: "new", group: "Epistles", chapters: 1, bollsId: 57 },
  { id: "hebrews", name: "Hebrews", abbr: "Heb", testament: "new", group: "Epistles", chapters: 13, bollsId: 58 },
  { id: "james", name: "James", abbr: "Jas", testament: "new", group: "Epistles", chapters: 5, bollsId: 59 },
  { id: "1-peter", name: "1 Peter", abbr: "1Pe", testament: "new", group: "Epistles", chapters: 5, bollsId: 60 },
  { id: "2-peter", name: "2 Peter", abbr: "2Pe", testament: "new", group: "Epistles", chapters: 3, bollsId: 61 },
  { id: "1-john", name: "1 John", abbr: "1Jn", testament: "new", group: "Epistles", chapters: 5, bollsId: 62 },
  { id: "2-john", name: "2 John", abbr: "2Jn", testament: "new", group: "Epistles", chapters: 1, bollsId: 63 },
  { id: "3-john", name: "3 John", abbr: "3Jn", testament: "new", group: "Epistles", chapters: 1, bollsId: 64 },
  { id: "jude", name: "Jude", abbr: "Jud", testament: "new", group: "Epistles", chapters: 1, bollsId: 65 },

  // Revelation
  { id: "revelation", name: "Revelation", abbr: "Rev", testament: "new", group: "Revelation", chapters: 22, bollsId: 66 },
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

export const TRANSLATION_CODE = "WEB";
export const TRANSLATION_NAME = "Contemporary English Version";
