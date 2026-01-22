
import { Entry } from './types';

export const GENRES = [
  'Fiction', 'Non-Fiction', 'Sci-Fi', 'Fantasy', 'Mystery', 
  'Biography', 'History', 'Horror', 'Romance', 'Documentary',
  'Action', 'Comedy', 'Drama', 'Thriller'
];

export const SPINE_COLORS = [
  '#e6b89c', '#ead7bb', '#b8c4bb', '#9caf88', '#8ba6a9', 
  '#757081', '#f0a202', '#fe5f55', '#d6eadf', '#95b8d1'
];

export const INITIAL_DATA: Entry[] = [
  {
    id: '1',
    type: 'book',
    title: 'The Great Gatsby',
    creator: 'F. Scott Fitzgerald',
    genres: ['Fiction', 'Drama'],
    date: '2023-05-15',
    rating: 5,
    thoughts: 'A hauntingly beautiful portrait of the American Dream. The prose is just incredible.',
    color: '#e6b89c'
  },
  {
    id: '2',
    type: 'movie',
    title: 'Inception',
    creator: 'Christopher Nolan',
    genres: ['Sci-Fi', 'Action'],
    date: '2023-06-10',
    rating: 4,
    thoughts: 'Mind-bending visuals. Need to watch it again to catch all the details!',
    color: '#8ba6a9'
  },
  {
    id: '3',
    type: 'book',
    title: 'Dune',
    creator: 'Frank Herbert',
    genres: ['Sci-Fi', 'Fantasy'],
    date: '2023-08-22',
    rating: 5,
    thoughts: 'World building at its peak. The political intrigue is fascinating.',
    color: '#9caf88'
  },
  {
    id: '4',
    type: 'movie',
    title: 'Coda',
    creator: 'Siân Heder',
    genres: ['Drama', 'Comedy'],
    date: '2023-09-05',
    rating: 5,
    thoughts: 'So heartwarming. The performances were incredible, especially the father.',
    color: '#fe5f55'
  }
];
