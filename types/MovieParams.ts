export interface GetMoviesParams {
  sortBy?: string;           // e.g., 'popularity.desc', 'release_date.desc', etc.
  page?: number;
  withCastId?: number;       // For filtering by actor ID (e.g., 500 for Tom Cruise)
  includeAdult?: boolean;
  includeVideo?: boolean;
  language?: string;
  genreId?: number; 

}