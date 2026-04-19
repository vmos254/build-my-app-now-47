// Sample chapter content (Douay-Rheims, public domain).
// Includes a few foundational chapters so the reader is fully functional out of the box.
// Other chapters fall back to a placeholder until live data fetching is wired up.

export interface Verse {
  num: number;
  text: string;
}

export interface ChapterData {
  bookId: string;
  chapter: number;
  verses: Verse[];
}

const CHAPTERS: Record<string, Verse[]> = {
  "genesis-1": [
    { num: 1, text: "In the beginning God created heaven, and earth." },
    { num: 2, text: "And the earth was void and empty, and darkness was upon the face of the deep; and the spirit of God moved over the waters." },
    { num: 3, text: "And God said: Be light made. And light was made." },
    { num: 4, text: "And God saw the light that it was good; and he divided the light from the darkness." },
    { num: 5, text: "And he called the light Day, and the darkness Night; and there was evening and morning one day." },
    { num: 6, text: "And God said: Let there be a firmament made amidst the waters: and let it divide the waters from the waters." },
    { num: 7, text: "And God made a firmament, and divided the waters that were under the firmament, from those that were above the firmament, and it was so." },
    { num: 8, text: "And God called the firmament, Heaven; and the evening and morning were the second day." },
    { num: 9, text: "God also said: Let the waters that are under the heaven, be gathered together into one place: and let the dry land appear. And it was so done." },
    { num: 10, text: "And God called the dry land, Earth; and the gathering together of the waters, he called Seas. And God saw that it was good." },
    { num: 11, text: "And he said: Let the earth bring forth the green herb, and such as may seed, and the fruit tree yielding fruit after its kind, which may have seed in itself upon the earth. And it was so done." },
    { num: 12, text: "And the earth brought forth the green herb, and such as yieldeth seed according to its kind, and the tree that beareth fruit, having seed each one according to its kind. And God saw that it was good." },
    { num: 13, text: "And the evening and the morning were the third day." },
    { num: 14, text: "And God said: Let there be lights made in the firmament of heaven, to divide the day and the night, and let them be for signs, and for seasons, and for days and years:" },
    { num: 15, text: "To shine in the firmament of heaven, and to give light upon the earth. And it was so done." },
    { num: 16, text: "And God made two great lights: a greater light to rule the day; and a lesser light to rule the night: and the stars." },
    { num: 17, text: "And he set them in the firmament of heaven to shine upon the earth." },
    { num: 18, text: "And to rule the day and the night, and to divide the light and the darkness. And God saw that it was good." },
    { num: 19, text: "And the evening and morning were the fourth day." },
    { num: 20, text: "God also said: Let the waters bring forth the creeping creature having life, and the fowl that may fly over the earth under the firmament of heaven." },
    { num: 21, text: "And God created the great whales, and every living and moving creature, which the waters brought forth, according to their kinds, and every winged fowl according to its kind. And God saw that it was good." },
    { num: 22, text: "And he blessed them, saying: Increase and multiply, and fill the waters of the sea: and let the birds be multiplied upon the earth." },
    { num: 23, text: "And the evening and morning were the fifth day." },
    { num: 24, text: "And God said: Let the earth bring forth the living creature in its kind, cattle and creeping things, and beasts of the earth, according to their kinds. And it was so done." },
    { num: 25, text: "And God made the beasts of the earth according to their kinds, and cattle, and every thing that creepeth on the earth after its kind. And God saw that it was good." },
    { num: 26, text: "And he said: Let us make man to our image and likeness: and let him have dominion over the fishes of the sea, and the fowls of the air, and the beasts, and the whole earth, and every creeping creature that moveth upon the earth." },
    { num: 27, text: "And God created man to his own image: to the image of God he created him: male and female he created them." },
    { num: 28, text: "And God blessed them, saying: Increase and multiply, and fill the earth, and subdue it, and rule over the fishes of the sea, and the fowls of the air, and all living creatures that move upon the earth." },
    { num: 29, text: "And God said: Behold I have given you every herb bearing seed upon the earth, and all trees that have in themselves seed of their own kind, to be your meat:" },
    { num: 30, text: "And to all beasts of the earth, and to every fowl of the air, and to all that move upon the earth, and wherein there is life, that they may have to feed upon. And it was so done." },
    { num: 31, text: "And God saw all the things that he had made, and they were very good. And the evening and morning were the sixth day." },
  ],
  "psalms-23": [
    { num: 1, text: "The Lord ruleth me: and I shall want nothing." },
    { num: 2, text: "He hath set me in a place of pasture. He hath brought me up, on the water of refreshment:" },
    { num: 3, text: "He hath converted my soul. He hath led me on the paths of justice, for his own name's sake." },
    { num: 4, text: "For though I should walk in the midst of the shadow of death, I will fear no evils, for thou art with me. Thy rod and thy staff, they have comforted me." },
    { num: 5, text: "Thou hast prepared a table before me against them that afflict me. Thou hast anointed my head with oil; and my chalice which inebriateth me, how goodly is it!" },
    { num: 6, text: "And thy mercy will follow me all the days of my life. And that I may dwell in the house of the Lord unto length of days." },
  ],
  "john-1": [
    { num: 1, text: "In the beginning was the Word, and the Word was with God, and the Word was God." },
    { num: 2, text: "The same was in the beginning with God." },
    { num: 3, text: "All things were made by him: and without him was made nothing that was made." },
    { num: 4, text: "In him was life, and the life was the light of men." },
    { num: 5, text: "And the light shineth in darkness, and the darkness did not comprehend it." },
    { num: 6, text: "There was a man sent from God, whose name was John." },
    { num: 7, text: "This man came for a witness, to give testimony of the light, that all men might believe through him." },
    { num: 8, text: "He was not the light, but was to give testimony of the light." },
    { num: 9, text: "That was the true light, which enlighteneth every man that cometh into this world." },
    { num: 10, text: "He was in the world, and the world was made by him, and the world knew him not." },
    { num: 11, text: "He came unto his own, and his own received him not." },
    { num: 12, text: "But as many as received him, he gave them power to be made the sons of God, to them that believe in his name." },
    { num: 13, text: "Who are born, not of blood, nor of the will of the flesh, nor of the will of man, but of God." },
    { num: 14, text: "And the Word was made flesh, and dwelt among us, (and we saw his glory, the glory as it were of the only begotten of the Father,) full of grace and truth." },
  ],
  "matthew-5": [
    { num: 1, text: "And seeing the multitudes, he went up into a mountain, and when he was set down, his disciples came unto him." },
    { num: 2, text: "And opening his mouth, he taught them, saying:" },
    { num: 3, text: "Blessed are the poor in spirit: for theirs is the kingdom of heaven." },
    { num: 4, text: "Blessed are the meek: for they shall possess the land." },
    { num: 5, text: "Blessed are they that mourn: for they shall be comforted." },
    { num: 6, text: "Blessed are they that hunger and thirst after justice: for they shall have their fill." },
    { num: 7, text: "Blessed are the merciful: for they shall obtain mercy." },
    { num: 8, text: "Blessed are the clean of heart: for they shall see God." },
    { num: 9, text: "Blessed are the peacemakers: for they shall be called children of God." },
    { num: 10, text: "Blessed are they that suffer persecution for justice' sake: for theirs is the kingdom of heaven." },
    { num: 11, text: "Blessed are ye when they shall revile you, and persecute you, and speak all that is evil against you, untruly, for my sake:" },
    { num: 12, text: "Be glad and rejoice, for your reward is very great in heaven. For so they persecuted the prophets that were before you." },
    { num: 13, text: "You are the salt of the earth. But if the salt lose its savour, wherewith shall it be salted? It is good for nothing any more but to be cast out, and to be trodden on by men." },
    { num: 14, text: "You are the light of the world. A city seated on a mountain cannot be hid." },
    { num: 15, text: "Neither do men light a candle and put it under a bushel, but upon a candlestick, that it may shine to all that are in the house." },
    { num: 16, text: "So let your light shine before men, that they may see your good works, and glorify your Father who is in heaven." },
  ],
};

export function getChapter(bookId: string, chapter: number): ChapterData {
  const key = `${bookId}-${chapter}`;
  const verses = CHAPTERS[key];
  if (verses) return { bookId, chapter, verses };
  // Fallback placeholder verses so the UI never breaks while live fetching is added later.
  return {
    bookId,
    chapter,
    verses: Array.from({ length: 8 }, (_, i) => ({
      num: i + 1,
      text: "This chapter will be available shortly. The full Douay-Rheims text is being loaded for this passage.",
    })),
  };
}

export function isChapterLoaded(bookId: string, chapter: number): boolean {
  return Boolean(CHAPTERS[`${bookId}-${chapter}`]);
}

export const VERSES_OF_THE_DAY = [
  { ref: "John 1:5", text: "And the light shineth in darkness, and the darkness did not comprehend it.", bookId: "john", chapter: 1, verse: 5 },
  { ref: "Psalm 23:1", text: "The Lord ruleth me: and I shall want nothing.", bookId: "psalms", chapter: 23, verse: 1 },
  { ref: "Matthew 5:9", text: "Blessed are the peacemakers: for they shall be called children of God.", bookId: "matthew", chapter: 5, verse: 9 },
  { ref: "Genesis 1:3", text: "And God said: Be light made. And light was made.", bookId: "genesis", chapter: 1, verse: 3 },
  { ref: "Matthew 5:8", text: "Blessed are the clean of heart: for they shall see God.", bookId: "matthew", chapter: 5, verse: 8 },
  { ref: "John 1:14", text: "And the Word was made flesh, and dwelt among us.", bookId: "john", chapter: 1, verse: 14 },
  { ref: "Matthew 5:6", text: "Blessed are they that hunger and thirst after justice: for they shall have their fill.", bookId: "matthew", chapter: 5, verse: 6 },
];

export function verseOfTheDay() {
  // Deterministic per-day pick.
  const dayIndex = Math.floor(Date.now() / (1000 * 60 * 60 * 24));
  return VERSES_OF_THE_DAY[dayIndex % VERSES_OF_THE_DAY.length];
}
