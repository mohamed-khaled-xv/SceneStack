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

export interface MovieDetailsInterface {
  adult: boolean;
  backdrop_path: string | null;
  belongs_to_collection: any | null; // You can define a nested type if needed
  budget: number;
  genres: {
    id: number;
    name: string;
  }[];
  homepage: string;
  id: number;
  imdb_id: string;
  origin_country: string[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: {
    id: number;
    logo_path: string | null;
    name: string;
    origin_country: string;
  }[];
  production_countries: {
    iso_3166_1: string;
    name: string;
  }[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: {
    english_name: string;
    iso_639_1: string;
    name: string;
  }[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface GetMoviesParams {
  query?: string;            // For text search, e.g., 'Inception'
  sortBy?: string;           // e.g., 'popularity.desc', 'release_date.desc', etc.
  page?: number;
  withCastId?: number;       // For filtering by actor ID (e.g., 500 for Tom Cruise)
  includeAdult?: boolean;
  includeVideo?: boolean;
  language?: string;
  genreId?: number; 

}


export interface MovieTrailerResult {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string; // "Trailer" | "Teaser" | etc.
  official: boolean;
  published_at: string;
  id: string;
}

export interface MovieTrailerInterface {
  id: number;
  results: MovieTrailerResult[];
}