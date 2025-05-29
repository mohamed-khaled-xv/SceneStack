export type Movie = {
  id: number;
  title: string;
  poster_path: string;
  backdrop_path?: string;
  overview?: string;
  release_date?: string;
  vote_average?: number;
  genre_ids?: number[];
  with_genres?: number; 
  [key: string]: any; // Optional: allows extra fields if needed
};
