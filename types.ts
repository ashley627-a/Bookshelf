
export type EntryType = 'book' | 'movie';

export interface Entry {
  id: string;
  type: EntryType;
  title: string;
  creator: string; // Author or Director
  genres: string[];
  date: string; // YYYY-MM-DD
  rating: number; // 1-5
  thoughts: string;
  color: string;
}

export type View = 'library' | 'stats' | 'add';
