// database/repositories/FavoriteMoviesRepository.ts
import { SQLiteDatabase } from 'expo-sqlite';
import { Movie } from '../../types/movie';

export async function insertToWatchMovie(
  db: SQLiteDatabase,
  movie: Movie
) {
  await db.runAsync(
    'INSERT INTO to_watch_movies (id, title, poster_path, release_date) VALUES (?, ?, ?, ?)',
    movie.id, movie.title, movie.poster_path, movie.release_date ?? null
  );
}

export async function getAllToWatchMovies(db: SQLiteDatabase) {
  return await db.getAllAsync<Movie>('SELECT * FROM to_watch_movies');
}

// NEW: Delete a movie by its ID
export async function deleteToWatchMovie(db: SQLiteDatabase, id: number) {
  await db.runAsync('DELETE FROM to_watch_movies WHERE id = ?', id);
}

export async function isMovieToWatch(db: SQLiteDatabase, id: number): Promise<boolean> {
  const result = await db.getFirstAsync('SELECT 1 FROM to_watch_movies WHERE id = ?', id);
  return !!result;
}
